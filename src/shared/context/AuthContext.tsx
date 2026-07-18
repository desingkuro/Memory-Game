import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";

export interface AuthContextType {
    user: Session | null;
    loading: boolean;
    setUser: (user: Session | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
    setLoading: () => { },
    logout: () => { }
});
