// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useTimeTracking from "@lib/time-tracking/useTimeTracking";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useTimeTrackingBugged from "@lib/time-tracking/bugged/useTimeTracking";
import { useEffect } from "react";
import clsx from "clsx";
import formatSecondsToTime from "@utils/formatSecondsToTime";

const BUGGED = import.meta.env.VITE_BUGGED_TIME_TRACKING === "true";
const initialTracks = JSON.parse(localStorage.getItem("tracks") || "{}");

const TimeTrackingControls = () => {
  const { state, task, tracking, stop } = (
    BUGGED ? useTimeTrackingBugged : useTimeTracking
  )(initialTracks);
  const recordTime = (state["away"] || 0) + (state["active"] || 0);

  useEffect(() => {
    localStorage.setItem("tracks", JSON.stringify(state));
  }, [state]);

  return (
    <div className="absolute right-5 bottom-5 flex flex-col items-center rounded border border-solid border-gray-300 bg-white p-4 shadow-md">
      <div className="flex items-center">
        <div
          className={clsx("mr-2 h-3 w-3 rounded-full", {
            "bg-green-500": task === "active",
            "bg-gray-500": task === "away",
          })}
        ></div>
        <span className="w-[150px] text-3xl font-thin">
          {task === "break" && <span className="text-2xl">Break Time</span>}{" "}
          {(task === "active" || task === "away") &&
            formatSecondsToTime(recordTime)}
          {task === null && <span className="text-2xl">Ready</span>}
        </span>
        {task === "break" || task === null ? (
          <button
            className="ml-2 h-16 w-16 rounded-full bg-teal-500 text-white transition-colors hover:bg-teal-600"
            onClick={() => tracking("active")}
          >
            Start
          </button>
        ) : (
          <button
            className="ml-2 h-16 w-16 rounded-full bg-red-400 text-white transition-colors hover:bg-red-500"
            onClick={() => tracking("break")}
          >
            Break
          </button>
        )}
        {task !== null && (
          <button
            className="ml-2 h-16 w-16 rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500"
            onClick={() => stop()}
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeTrackingControls;
