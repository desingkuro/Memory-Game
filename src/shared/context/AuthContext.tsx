import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
}

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
    setLoading: () => { }
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setUser({
                name: "John Doe",
                email: "john.doe@example.com",
                role: "admin"
            });
            setLoading(false);
        }, 2000);

        /* get('api/auth/me').then((response) => {
             setUser(response);
             setLoading(false);
         }).catch((error: any) => {
             console.error(error);
             setUser(null);
         }).finally(() => {
             setLoading(false);
         });*/
    }, []);

    return <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
        {children}
    </AuthContext.Provider>
}

