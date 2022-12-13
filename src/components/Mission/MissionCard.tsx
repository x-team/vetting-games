import Card from "@components/Surface/Card";
import Chip from "@components/DataDisplay/Chip";
import Button from "@components/Input/Button";
import { Mission } from "@gql/graphql";
import clsx from "clsx";
import { useMemo } from "react";

interface MissionCardProps {
  mission: Mission;
  onStart?: (mission: Mission) => void;
}

const MissionCard = ({ mission, onStart }: MissionCardProps) => {
  const released = useMemo(() => {
    if (!mission.releaseDate) {
      return false;
    }

    const releaseDate = new Date(mission.releaseDate);
    const now = new Date();
    return releaseDate <= now;
  }, [mission.releaseDate]);

  const handleStart = () => {
    onStart?.(mission);
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 rounded-lg bg-neutral-800 p-6 text-white",
        !released && "bg-neutral-800 p-6 text-neutral-400"
      )}
    >
      <h2 className="flex justify-between uppercase">
        <span className="text-large">{mission.title}</span>
        <span className="flex items-center gap-2 text-small-bold">
          {!released && <Chip>Coming soon</Chip>} Level {mission.level}
        </span>
      </h2>
      {mission.description && (
        <p className="text-neutral-200 text-small">{mission.description}</p>
      )}
      {released && (
        <Button
          variant="contained"
          className="self-end uppercase"
          onPress={handleStart}
        >
          Start Mission
        </Button>
      )}
    </div>
  );
};

export default MissionCard;
