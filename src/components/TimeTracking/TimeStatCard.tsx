import formatSecondsToTime from "@utils/formatSecondsToTime";
import clsx from "clsx";

interface TimeStatCardProps {
  title: string;
  subtitle?: string;
  value: number;
  className?: string;
}

const TimeStatCard = ({
  title,
  subtitle,
  value,
  className,
}: TimeStatCardProps) => {
  return (
    <div
      className={clsx(
        "flex h-[60px] items-center justify-between rounded-lg px-6 transition-colors text-xsmall-bold",
        className
      )}
    >
      <span className="flex flex-col uppercase">
        {title}
        {subtitle ? (
          <span className="font-normal normal-case text-xsmall">
            {subtitle}
          </span>
        ) : null}
      </span>
      <span>{formatSecondsToTime(value)} sec</span>
    </div>
  );
};

export default TimeStatCard;
