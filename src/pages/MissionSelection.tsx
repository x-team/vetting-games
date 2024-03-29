import { useMutation, useQuery } from "@apollo/client";
import Card from "@components/Surface/Card";
import { ErrorCode, hasGraphQLErrorCode } from "@utils/error";
import { gql } from "@gql";
import BasicLayout from "@components/Layout/BasicLayout";
import { gamePath, missionSelectionPath } from "@router/paths";
import { useNavigate, useParams } from "react-router-dom";
import MissionCard from "@components/Mission/MissionCard";
import { Mission } from "@gql/graphql";
import { useEffect, useState } from "react";
import LoadingPage from "./Loading";

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

const currentGameDocument = gql(/* GraphQL */ `
  query currentGame {
    game {
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
    fetchPolicy: "cache-and-network",
  });
  const { data: gameData, refetch } = useQuery(currentGameDocument, {
    fetchPolicy: "network-only",
  });
  const [missionSelected, setMissionSelected] = useState<number | null>(null);
  const [startMission] = useMutation(startMissionDocument, {
    onCompleted: (data) => navigate(gamePath(data.startGame.id)),
    onError: ({ graphQLErrors }) => {
      if (hasGraphQLErrorCode(graphQLErrors, ErrorCode.GAME_ALREADY_STARTED)) {
        refetch();
        return;
      }

      setMissionSelected(null);
    },
  });
  const missions = missionData?.missionsByType;
  const handleStart = (mission: Mission) => {
    setMissionSelected(mission.id);
    startMission({ variables: { missionId: mission.id } });
  };

  useEffect(() => {
    if (gameData?.game?.id) {
      navigate(gamePath(gameData.game.id));
    }
  }, [gameData]);

  if (loading) return <LoadingPage />;

  if (error) return <LoadingPage />;

  return (
    <BasicLayout className="items-center justify-center">
      <Card className="w-[660px] gap-10">
        <h1 className="flex justify-center text-xlarge">Select Mission</h1>
        <div className="flex flex-col gap-2">
          {missions?.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              loading={missionSelected === mission.id}
              onStart={handleStart}
            />
          ))}
        </div>
      </Card>
    </BasicLayout>
  );
};

export default MissionSelectionPage;
