import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

export default function useAuth(): AuthContextType {
    const { user, loading, setUser, setLoading } = useContext<AuthContextType>(AuthContext);
    return { user, loading, setUser, setLoading };
}