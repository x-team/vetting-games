import PauseIcon from "@components/Icon/PauseIcon";
import PlayIcon from "@components/Icon/PlayIcon";
import StopIcon from "@components/Icon/StopIcon";
import Button from "@components/Input/Button";
import clsx from "clsx";
import DigitalClockDigits from "./DigitalClockDigits";

interface DigitalClockProps {
  time: number;
  isPaused: boolean;
  isStopped: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

const DigitalClock = ({
  time,
  isPaused,
  isStopped,
  onPlay,
  onPause,
  onStop,
}: DigitalClockProps) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={clsx(
          "flex gap-4 transition-transform",
          !isStopped && "-translate-y-14"
        )}
      >
        <div className="flex gap-6">
          <DigitalClockDigits value={hours} label="Hours" />
          <DigitalClockDigits value={minutes} label="Minutes" />
          <DigitalClockDigits value={seconds} label="Seconds" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-ecru-200 bg-ecru-200 fill-neutral-900 focus:outline-ecru-300 hover:border-ecru-300 hover:bg-ecru-300"
            noPadding
            onPress={() => (isPaused ? onPlay() : onPause())}
          >
            {isPaused ? (
              <PlayIcon className="h-4" />
            ) : (
              <PauseIcon className="h-4" />
            )}
          </Button>
          {!isStopped && (
            <Button
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-neutral-900 bg-neutral-900 focus:outline-ecru-300 hover:border-neutral-900 hover:bg-neutral-900"
              noPadding
              onPress={onStop}
            >
              <StopIcon className="h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
