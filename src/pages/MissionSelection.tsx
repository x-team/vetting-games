import { useMutation, useQuery } from "@apollo/client";
import Card from "@components/Surface/Card";
import { ErrorCode, hasGraphQLErrorCode } from "@error";
import { gql } from "@gql";
import BasicLayout from "@components/Layout/BasicLayout";
import { gamePath, missionSelectionPath } from "@router/paths";
import { useNavigate, useParams } from "react-router-dom";
import MissionCard from "@components/Mission/MissionCard";
import { Mission } from "@gql/graphql";

type MissionParams = {
  type: string;
};

const missionDocument = gql(/* GraphQL */ `
  query missionsByType($type: String!) {
    missionsByType(type: $type) {
      id
      title
      type
      level
      description
      releaseDate
    }
  }
`);

const startMissionDocument = gql(/* GraphQL */ `
  mutation startMission($missionId: Int!) {
    startGame(missionId: $missionId) {
      id
    }
  }
`);

const MissionSelectionPage = () => {
  const navigate = useNavigate();
  const { type: typeParam = "js" } = useParams<MissionParams>();
  const {
    data: missionData,
    loading,
    error,
  } = useQuery(missionDocument, {
    variables: { type: typeParam || "" },
    onError: () => navigate(missionSelectionPath()),
  });
  const [startMission] = useMutation(startMissionDocument, {
    onCompleted: () => navigate(gamePath()),
    onError: ({ graphQLErrors }) => {
      if (hasGraphQLErrorCode(graphQLErrors, ErrorCode.GAME_ALREADY_STARTED)) {
        navigate(gamePath());
      }
    },
  });
  const missions = missionData?.missionsByType;
  const handleStart = (mission: Mission) => {
    startMission({ variables: { missionId: mission.id } });
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <BasicLayout className="items-center justify-center">
      <Card className="w-[660px] gap-10">
        <h1 className="flex justify-center text-xlarge">Select Mission</h1>
        <div className="flex flex-col gap-2">
          {missions?.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onStart={handleStart}
            />
          ))}
        </div>
      </Card>
    </BasicLayout>
  );
};

export default MissionSelectionPage;
