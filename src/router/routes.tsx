/* eslint-disable react/jsx-key */
import TimeTracking from "@pages/TimeTracking";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export default createBrowserRouter(
  createRoutesFromElements([<Route path="/" element={<TimeTracking />} />])
);
