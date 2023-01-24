/* eslint-disable react/jsx-key */
import CallbackPage from "@pages/Callback";
import GamePage, { gameLoader } from "@pages/Game";
import LoginPage from "@pages/Login";
import LogoutPage from "@pages/Logout";
import MissionSelection from "@pages/MissionSelection";
import ScoreboardPage from "@pages/Scoreboard";
import TimeTrackingPage from "@pages/TimeTracking";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import AnonymousRoute from "./AnonymousRoute";
import {
  callbackPath,
  gamePath,
  loginPath,
  logoutPath,
  missionSelectionPath,
  scoreboardPath,
  timeTrackingPath,
} from "./paths";
import ProtectedRoute from "./ProtectedRoute";

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate to={loginPath()} />} />,
    <Route path={timeTrackingPath()} element={<TimeTrackingPage />} />,
    <Route path={logoutPath()} element={<LogoutPage />} />,
    <Route element={<AnonymousRoute />}>
      <Route path={loginPath()} element={<LoginPage />} />,
    </Route>,
    <Route path={callbackPath()} element={<CallbackPage />} />,
    <Route element={<ProtectedRoute />}>
      <Route path={missionSelectionPath()} element={<MissionSelection />} />
      <Route
        path={gamePath(":id")}
        element={<GamePage />}
        loader={gameLoader}
      />
      <Route
        path={scoreboardPath(":missionId", ":gameId")}
        element={<ScoreboardPage />}
      />
    </Route>,
  ])
);
