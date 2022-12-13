import Monstah from "@components/Icon/Monstah/Monstah";
import clsx from "clsx";
import TimeStatCard from "./TimeStatCard";

const TaskMoodMap: Record<string, string> = {
  active: "normal",
  break: "lazy",
  away: "angry",
};

interface StatsProps {
  state: Record<string, number>;
  task: string;
}

const Stats = ({ state, task }: StatsProps) => {
  const activeTime = state["active"] || 0;
  const awayTime = state["away"] || 0;
  const breakTime = state["break"] || 0;

  return (
    <div className="relative flex flex-col">
      {task !== null && (
        <Monstah
          className="absolute -bottom-4 flex w-full justify-center"
          mood={TaskMoodMap[task || "active"]}
        />
      )}
      <div className="relative -m-4 flex flex-col gap-1 rounded-2xl bg-neutral-900 p-4">
        <TimeStatCard
          title="Active"
          subtitle={task === "active" ? "All good 👍" : undefined}
          value={activeTime}
          className={clsx(
            task === "active"
              ? "bg-blue-600 text-blue-200"
              : "bg-neutral-800 text-neutral-400"
          )}
        />
        <TimeStatCard
          title="Away"
          subtitle={task === "away" ? "Hello? 🚨" : undefined}
          value={awayTime}
          className={clsx(
            task === "away"
              ? "bg-red-600 text-red-200"
              : "bg-neutral-800 text-neutral-400"
          )}
        />
        <TimeStatCard
          title="Break"
          subtitle={
            task === "break" ? "5 minutes each hour max! ⏲️" : undefined
          }
          value={breakTime}
          className={clsx(
            task === "break"
              ? "bg-green-600 text-green-200"
              : "bg-neutral-800 text-neutral-400"
          )}
        />
      </div>
    </div>
  );
};

export default Stats;
