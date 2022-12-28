import { Scoreboard } from "@gql/graphql";
import formatSecondsToTime from "@utils/formatSecondsToTime";
import clsx from "clsx";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";

type ScoreboardItem = {
  position: string | number;
  name: string;
  score: string;
};

interface ScoreboardTableProps {
  position?: number;
  scoreboards?: Scoreboard[];
  scoreboard?: Scoreboard | null;
}

const ScoreboardTable = ({
  position: userPosition,
  scoreboards,
  scoreboard,
}: ScoreboardTableProps) => {
  const authUser = useAuthUser();
  const scoreboardItems = useMemo<ScoreboardItem[]>(() => {
    if (!scoreboards || !userPosition || !scoreboard) return [];

    const topScoreboard = scoreboards.map<ScoreboardItem>(
      ({ score, user }, i) => ({
        position: i + 1,
        name: user?.alias || user?.name || "Anonymous",
        score: formatSecondsToTime(score),
      })
    );

    if (userPosition > 10) {
      const user = authUser();
      topScoreboard.push({ position: "...", name: "", score: "" });
      topScoreboard.push({
        position: userPosition,
        name: user?.alias || user?.name || "Anonymous",
        score: formatSecondsToTime(scoreboard.score || 0),
      });
    }

    return topScoreboard;
  }, [scoreboards, userPosition, scoreboard]);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="h-10 font-inter text-xs font-bold uppercase leading-3 text-neutral-400">
          <th className="pl-6 text-start">#</th>
          <th className="text-start">Player Name</th>
          <th className="pr-6 text-end">Total Time</th>
        </tr>
      </thead>
      <tbody>
        {scoreboardItems.map(({ position, name, score }, index) => {
          const isCurrentUser = position === userPosition;

          return (
            <tr
              key={index}
              className={clsx(
                "h-14 border-b-2 border-neutral-200 text-small-bold",
                isCurrentUser ? "bg-blue-800 text-blue-200" : "text-neutral-400"
              )}
            >
              <td className="pl-6">{position}</td>
              <td
                className={clsx(
                  isCurrentUser ? "text-blue-200" : "text-neutral-900"
                )}
              >
                {name}
              </td>
              <td
                className={clsx("pr-6 text-end", isCurrentUser && "text-white")}
              >
                {score}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScoreboardTable;
