import { useEffect, useRef, useState } from "react";
import { TimeTrackingContextData } from "./context";

const useTimeTrack = (
  initialTracks?: Record<string, number>
): TimeTrackingContextData => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("time");
  const { current: tracks } = useRef<Record<string, number>>(
    initialTracks || {}
  );

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(
        () =>
          setTime((currentTime) => {
            const newTime = currentTime + 1;
            tracks[task] = newTime;
            return newTime;
          }),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [isRunning, task]);

  return {
    tracks,
    time,
    task,
    isRunning,
    track: (task: string) => {
      setTask(task);
      setIsRunning(true);
      setTime(tracks[task] || 0);
    },
    stop: () => setIsRunning(false),
  };
};

export default useTimeTrack;
