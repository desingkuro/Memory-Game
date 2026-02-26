import type { ReactNode } from "react";
import { Navigate } from "react-router";

import Loader from "../../shared/components/Loader";
import useAuth from "../../shared/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader/>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;