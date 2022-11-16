import { useEffect } from "react";
import { useTimeTracking } from "./lib/time-tracking";

const TimeTrackingControls = () => {
  const { time, isRunning, task, track, tracks, stop } = useTimeTracking();

  useEffect(() => {
    localStorage.setItem("tracks", JSON.stringify(tracks));
  }, [time]);

  return (
    <div className="flex flex-col items-center rounded border border-solid border-gray-300 p-4">
      <h2 className="mb-10 text-2xl">Timer ({isRunning ? task : "Stopped"})</h2>
      <div className="mb-10 flex flex-col items-center">
        <h3 className="mb-4 text-2xl">{time} secs</h3>
        <div>
          <button
            className="ml-4 rounded-full border bg-sky-500 px-4 py-1 font-medium text-white hover:bg-sky-700"
            onClick={() => track("Working 😅")}
          >
            Working 😅
          </button>
          <button
            className="ml-4 rounded-full border bg-sky-500 px-4 py-1 font-medium text-white hover:bg-sky-700"
            onClick={() => track("Idle 👻")}
          >
            Idle 👻
          </button>
          <button
            className="ml-4 rounded-full border bg-sky-500 px-4 py-1 font-medium text-white hover:bg-sky-700"
            onClick={() => track("Break 🚽")}
          >
            Break 🚽
          </button>
          <button
            className="ml-4 rounded-full border bg-sky-500 px-4 py-1 font-medium text-white hover:bg-sky-700"
            onClick={() => stop()}
          >
            Stop 🛑
          </button>
        </div>
      </div>
      <code>{JSON.stringify(tracks, null, 2)}</code>
    </div>
  );
};

export default TimeTrackingControls;
