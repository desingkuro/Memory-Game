import { useContext } from "react";
import type { User } from "@supabase/supabase-js";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

interface InterfaceUseAuth{
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
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