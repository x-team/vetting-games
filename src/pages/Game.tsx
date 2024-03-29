import { useQuery } from "@apollo/client";
import { gql } from "@gql";
import BasicLayout from "@components/Layout/BasicLayout";
import { missionSelectionPath } from "@router/paths";
import { LoaderFunction, useNavigate, useParams } from "react-router-dom";
import { apolloClient } from "@apollo";
import { GameQuery } from "@gql/graphql";
import Footer from "@components/Game/Footer";
import WindowsSection from "@components/Game/WindowsSection";
import Cards from "@components/Game/Cards";
import GameTour from "@components/Game/GameTour";
import { GameTourProvider } from "@components/Game/GameTourContext";

export const gameDocument = gql(/* GraphQL */ `
  query game($id: ID!) {
    game(id: $id) {
      id
      startedAt
      mission {
        id
        title
        type
        level
        description
        bugTypes {
          id
          name
          description
        }
      }
      pickedBugs {
        bugTypeId
      }
    }
    gameFiles(gameId: $id) {
      id
      name
      content
    }
    me {
      settings {
        gameSettings {
          showTutorial
        }
      }
    }
  }
`);

export const selectBugDocument = gql(/* GraphQL */ `
  mutation selectBug($gameId: ID!, $bugTypeId: Int!) {
    selectBug(gameId: $gameId, bugTypeId: $bugTypeId) {
      id
      pickedBugs {
        bugTypeId
      }
    }
  }
`);

export const unselectBugDocument = gql(/* GraphQL */ `
  mutation unselectBug($gameId: ID!, $bugTypeId: Int!) {
    unselectBug(gameId: $gameId, bugTypeId: $bugTypeId) {
      id
      pickedBugs {
        bugTypeId
      }
    }
  }
`);

export const finishGameDocument = gql(/* GraphQL */ `
  mutation finishGame($id: ID!) {
    finishGame(id: $id) {
      id
      finishedAt
    }
  }
`);

export const updateGameSettingsDocument = gql(/* GraphQL */ `
  mutation updateGameSettings($showTutorial: Boolean!) {
    updateSettings(
      settings: { gameSettings: { showTutorial: $showTutorial } }
    ) {
      gameSettings {
        showTutorial
      }
    }
  }
`);

export interface GamePageParams {
  id: string;
}

export interface GameLoaderArgs {
  params: GamePageParams;
}

export interface GameLoaderData {
  data: GameQuery;
  breadcrumbs: string[];
}

export interface GameLoader extends LoaderFunction {
  (args: GameLoaderArgs): Promise<GameLoaderData>;
}

export const gameLoader: GameLoader = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: gameDocument,
    variables: {
      id: params.id as string,
    },
  });
  const game = data.game;

  return {
    data,
    breadcrumbs: [
      "Home",
      `${game?.mission?.type} level ${game?.mission?.level}`,
    ],
  };
};

const GamePage = () => {
  const params = useParams<keyof GamePageParams>();
  const navigate = useNavigate();
  useQuery(gameDocument, {
    skip: !params.id,
    variables: { id: params.id as string },
    onError: () => navigate(missionSelectionPath()),
    onCompleted: (data) => {
      if (!data.game) navigate(missionSelectionPath());
    },
  });

  return (
    <BasicLayout
      className="relative flex-col gap-14 overflow-hidden p-6"
      containerClassName="max-h-screen"
    >
      <GameTourProvider>
        <WindowsSection />
        <Footer />
        <Cards />
        <GameTour />
      </GameTourProvider>
    </BasicLayout>
  );
};

export default GamePage;
