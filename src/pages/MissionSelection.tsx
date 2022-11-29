import { useQuery } from "@apollo/client";
import { gql } from "@gql";
import { missionPath } from "@router/paths";
import { useNavigate } from "react-router-dom";

const getMissionsDocument = gql(/* GraphQL */ `
  query missions {
    missions {
      id
      title
      type
      level
      description
    }
  }
`);

const MissionSelection = () => {
  const navigate = useNavigate();
  useQuery(getMissionsDocument, {
    onCompleted: (data) => {
      const mission = data.missions[0];

      if (mission) {
        navigate(missionPath(mission.type, mission.level));
      }
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200">
      <div className="flex w-[400px] flex-col gap-10 bg-white p-10">
        <h1 className="text-center font-prompt text-4xl font-extrabold uppercase italic text-gray-800">
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default MissionSelection;
