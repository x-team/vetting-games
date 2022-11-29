import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, Outlet } from "react-router-dom";

const AnonymousRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return <Navigate to="/mission" />;
  }

  return <Outlet />;
};

export default AnonymousRoute;
