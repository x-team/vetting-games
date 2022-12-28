import Button from "@components/Input/Button";
import { missionSelectionPath } from "@router/paths";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface ScoreboardMessageProps {
  failed: boolean;
}

const ScoreboardMessage = ({ failed }: ScoreboardMessageProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-[434px] flex-col items-center justify-center gap-12 text-white xl:min-w-[434px]">
      <div className="flex flex-col gap-4">
        <h1
          className={clsx("text-center text-xxlarge", failed && "text-red-600")}
        >
          {failed ? "mission failed" : "mission completed!"}
        </h1>
        <span className="hidden text-center text-small-bold">
          {"{{secondary_message}}"}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="contained"
          onPress={() => navigate(missionSelectionPath())}
        >
          Finish
        </Button>
        {failed && (
          <Button
            variant="outlined"
            onPress={() => navigate(missionSelectionPath())}
          >
            Pick a new game
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScoreboardMessage;
