import { useQuery } from "@apollo/client";
import Monstah from "@components/Icon/Monstah/Monstah";
import BasicLayout from "@components/Layout/BasicLayout";
import ScoreboardMessage from "@components/Scoreboard/ScoreboardMessage";
import ScoreboardTable from "@components/Scoreboard/ScoreboardTable";
import { gql } from "@gql";
import { useParams } from "react-router-dom";
import LoadingPage from "./Loading";

const scoreboardDocument = gql(/* GraphQL */ `
  query scoreboard(
    $missionId: Int!
    $gameId: ID!
    $pagination: ScoreboardPaginationInput!
  ) {
    getScoreboardPosition(missionId: $missionId)
    scoreboards(missionId: $missionId, pagination: $pagination) {
      id
      score
      user {
        id
        name
        alias
        image
      }
    }
    scoreboard(missionId: $missionId) {
      id
      score
    }
    game(id: $gameId) {
      id
      score
    }
  }
`);

export interface ScoreboardPageParams {
  missionId: string;
  gameId: string;
}

const ScoreboardPage = () => {
  const params = useParams<keyof ScoreboardPageParams>();
  const { data, loading } = useQuery(scoreboardDocument, {
    variables: {
      missionId: parseInt(params.missionId || "1"),
      gameId: params.gameId || "",
      pagination: {
        take: 10,
        skip: 0,
      },
    },
    skip: !params.missionId || !params.gameId,
    fetchPolicy: "cache-and-network",
  });
  const failed = data?.game?.score !== 1;

  if (loading) return <LoadingPage />;

  return (
    <BasicLayout
      className="flex-col items-center justify-between gap-4 px-20 py-28 xl:flex-row"
      containerClassName="max-h-screen"
    >
      <div className="absolute -left-[450px] bottom-0">
        <Monstah
          mood={failed ? "disappointed" : "happy"}
          className="w-[850px]"
        />
      </div>
      <ScoreboardMessage failed={failed} />
      <div className="relative flex w-full flex-1 items-center xl:min-w-[660px]">
        <div className="w-full overflow-x-auto bg-white p-6">
          <ScoreboardTable
            position={data?.getScoreboardPosition}
            scoreboard={data?.scoreboard}
            scoreboards={data?.scoreboards}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ScoreboardPage;
