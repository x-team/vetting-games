import { useQuery } from "@apollo/client";
import Card from "@components/Surface/Card";
import { gql } from "@gql";
import BasicLayout from "@components/Layout/BasicLayout";
import { missionSelectionPath } from "@router/paths";
import { useNavigate } from "react-router-dom";

const gameDocument = gql(/* GraphQL */ `
  query game {
    game {
      id
      startedAt
      mission {
        id
        title
        type
        level
        description
      }
    }
  }
`);

const GamePage = () => {
  const navigate = useNavigate();
  const { data: gameData } = useQuery(gameDocument, {
    onError: () => {
      navigate(missionSelectionPath());
    },
    onCompleted: (data) => {
      if (!data.game) {
        navigate(missionSelectionPath());
      }
    },
  });
  const game = gameData?.game;

  return (
    <BasicLayout className="items-center justify-center">
      <Card className="w-[600px] gap-10">
        <h1 className="flex justify-center text-xlarge">Game Page</h1>
        <code className="overflow-auto whitespace-pre text-snippet">
          {JSON.stringify(game, null, 2)}
        </code>
      </Card>
    </BasicLayout>
  );
};

export default GamePage;
