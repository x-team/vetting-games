/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

export interface TimeTrackingContextData {
  tracks: Record<string, number>;
  time: number;
  task: string;
  isRunning: boolean;
  track: (task: string) => void;
  stop: () => void;
}

export const timeTrackingContext = createContext<TimeTrackingContextData>({
  tracks: {},
  time: 0,
  task: "",
  isRunning: false,
  track: (task: string) => {},
  stop: () => {},
});
