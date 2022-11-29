/* eslint-disable react/jsx-key */
import Callback from "@pages/Callback";
import Login from "@pages/Login";
import Mission from "@pages/Mission";
import MissionSelection from "@pages/MissionSelection";
import TimeTracking from "@pages/TimeTracking";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import AnonymousRoute from "./AnonymousRoute";
import {
  callbackPath,
  loginPath,
  missionPath,
  missionSelectionPath,
  timeTrackingPath,
} from "./paths";
import ProtectedRoute from "./ProtectedRoute";

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate to={loginPath()} />} />,
    <Route path={timeTrackingPath()} element={<TimeTracking />} />,
    <Route element={<AnonymousRoute />}>
      <Route path={loginPath()} element={<Login />} />,
    </Route>,
    <Route path={callbackPath()} element={<Callback />} />,
    <Route element={<ProtectedRoute />}>
      <Route path={missionSelectionPath()} element={<MissionSelection />} />
      <Route path={missionPath()} element={<Mission />} />
    </Route>,
  ])
);
