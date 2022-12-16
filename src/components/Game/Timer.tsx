import { GameLoaderData } from "@pages/Game";
import formatSecondsToTime from "@utils/formatSecondsToTime";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function getTimeDiff(time: number) {
  if (!time) return 0;
  return Math.floor((Date.now() - time) / 1000);
}

const useTimeDiff = (time: number) => {
  const [currentTime, setCurrentTime] = useState(() => getTimeDiff(time));

  useEffect(() => {
    setCurrentTime(getTimeDiff(time));
    const interval = setInterval(() => {
      setCurrentTime(getTimeDiff(time));
    }, 1000);
    return () => clearInterval(interval);
  }, [getTimeDiff, setCurrentTime, time]);

  return currentTime;
};

const Timer = () => {
  const { data: gameData } = useLoaderData() as GameLoaderData;
  const currentTime = useTimeDiff(gameData?.game?.startedAt || Date.now());

  return (
    <div className="flex flex-col items-end gap-2 text-white">
      <span className="uppercase text-neutral-400 text-xsmall-bold">
        Total Time
      </span>
      <span className="text-white text-small-bold">
        {formatSecondsToTime(currentTime)} sec
      </span>
    </div>
  );
};

export default Timer;
