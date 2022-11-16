import { FC, ReactNode } from "react";
import { timeTrackingContext } from "./context";
import useTimeTrack from "./useTimeTrack";

export const TimeTrackingProvider: FC<{
  children: ReactNode;
  initialTracks?: Record<string, number>;
}> = ({ children, initialTracks }) => {
  const timeTrack = useTimeTrack(initialTracks);

  return (
    <timeTrackingContext.Provider value={timeTrack}>
      {children}
    </timeTrackingContext.Provider>
  );
};
