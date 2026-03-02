import { createContext, useEffect, useState } from "react";
import { Alert } from "../services/AlertServices";
import { useSnackbar } from "notistack";
import { supabase } from "../services/Supabase.client";
import { logoutUser } from "../services/Api.services";


export interface AuthContextType {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
    setLoading: () => { },
    logout: () => { }
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();

    const logout = async () => {
        setLoading(true);
        const result = await logoutUser();
        setLoading(false);
        if (result) {
            setUser(null);
            Alert({
                text: "Sesión cerrada",
                type: "success"
            }, enqueueSnackbar);
        } else {
            Alert({
                text: "Error al cerrar sesión",
                type: "error"
            }, enqueueSnackbar);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session);
            setLoading(false);
            Alert({
                text: "Sesión iniciada",
                type: "success"
            }, enqueueSnackbar);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session);
                setLoading(false);
                Alert({
                    text: "Sesión iniciada",
                    type: "success"
                }, enqueueSnackbar);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
