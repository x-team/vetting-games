import useTimeTracking from "@lib/time-tracking/useTimeTracking";
import useTimeTrackingBugged from "@lib/time-tracking/bugged/useTimeTracking";
import { useEffect } from "react";
import clsx from "clsx";
import Stats from "./Stats";
import DigitalClock from "./DigitalClock";
import Header from "./Header";

const BUGGED = import.meta.env.VITE_BUGGED_TIME_TRACKING === "true";
const initialTracks = JSON.parse(localStorage.getItem("tracks") || "{}");

const TimeTrackingControls = ({ bugged = BUGGED }: { bugged?: boolean }) => {
  const { state, task, tracking, stop } = (
    bugged ? useTimeTrackingBugged : useTimeTracking
  )(initialTracks);
  const recordTime =
    (state["away"] || 0) + (state["active"] || 0) + (state["break"] || 0);
  const isPaused = task === null || task === "break";

  useEffect(() => {
    localStorage.setItem("tracks", JSON.stringify(state));
  }, [state]);

  return (
    <div
      className={clsx(
        "flex h-full min-h-[640px] flex-col p-6 transition-colors",
        {
          "bg-neutral-900 text-white": task === null,
          "bg-blue-600 text-blue-200": task === "active",
          "bg-green-600 text-green-200": task === "break",
          "bg-red-600 text-red-200": task === "away",
        }
      )}
    >
      <Header />
      <DigitalClock
        time={recordTime}
        isPaused={isPaused}
        isStopped={task === null}
        onPlay={() => tracking("active")}
        onPause={() => tracking("break")}
        onStop={() => stop()}
      />
      <Stats state={state} task={task} />
    </div>
  );
};

export default TimeTrackingControls;
