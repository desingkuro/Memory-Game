import { createContext, useEffect, useState } from "react";
import { Alert } from "../services/AlertServices";
import { useSnackbar } from "notistack";


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
    const {enqueueSnackbar} = useSnackbar();

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }else{
            Alert({
                text: "No se encontró el usuario",
                type: "error"
            },enqueueSnackbar);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
