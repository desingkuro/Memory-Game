import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Alert } from "../services/AlertServices";
import { useSnackbar } from "notistack";
import { supabase } from "../services/Supabase.client";
import { logoutUser } from "../services/Api.services";
import { AuthContext } from "./AuthContext";

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<Session | null>(null);
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
    }, [enqueueSnackbar]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
