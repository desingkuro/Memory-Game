import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

interface InterfaceUseAuth{
    isAuthenticated: boolean;
    user: any;
    token: string;
    isLoading: boolean;
    logout: () => void;
}

export default function useAuth(): InterfaceUseAuth {
    const { user, loading, logout } = useContext<AuthContextType>(AuthContext);
   return {
        isAuthenticated: !!user,
        user: user?.user ?? null,
        token: user?.access_token ?? null,
        isLoading: loading,
        logout
    };
}