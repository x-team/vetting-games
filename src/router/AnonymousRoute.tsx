import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, Outlet } from "react-router-dom";
import { missionSelectionPath } from "./paths";

const AnonymousRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return <Navigate to={missionSelectionPath()} />;
  }

  return <Outlet />;
};

export default AnonymousRoute;
