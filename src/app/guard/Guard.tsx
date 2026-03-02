import type { ReactNode } from "react";
import { Navigate } from "react-router";

import Loader from "../../shared/components/Loader";
import useAuth from "../../shared/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader/>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;