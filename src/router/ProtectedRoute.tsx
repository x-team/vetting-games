import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, Outlet } from "react-router-dom";
import { loginPath } from "./paths";

const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated()) {
    return <Navigate to={loginPath()} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
