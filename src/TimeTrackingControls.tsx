import { useEffect } from "react";
import { useTimeTracking } from "./lib/time-traking";

const TimeTrackingControls = () => {
  const { time, isRunning, task, track, tracks, stop } = useTimeTracking();

  useEffect(() => {
    localStorage.setItem("tracks", JSON.stringify(tracks));
  }, [time]);

  return (
    <div className="flex flex-col items-center border-solid border border-gray-300 rounded p-4">
      <h2 className="text-2xl mb-10">Timer ({isRunning ? task : "Stopped"})</h2>
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-2xl mb-4">{time} secs</h3>
        <div>
          <button
            className="ml-4 border bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 rounded-full font-medium"
            onClick={() => track("Working 😅")}
          >
            Working 😅
          </button>
          <button
            className="ml-4 border bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 rounded-full font-medium"
            onClick={() => track("Idle 👻")}
          >
            Idle 👻
          </button>
          <button
            className="ml-4 border bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 rounded-full font-medium"
            onClick={() => track("Break 🚽")}
          >
            Break 🚽
          </button>
          <button
            className="ml-4 border bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 rounded-full font-medium"
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
