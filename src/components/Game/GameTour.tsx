import { useMutation } from "@apollo/client";
import Tour from "@components/Tour/Tour";
import { TourStep } from "@components/Tour/useTour";
import { GameLoaderData, updateGameSettingsDocument } from "@pages/Game";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const steps: TourStep[] = [
  {
    target: "[data-tour='window-tab-app']",
    title: "The time tracker",
    content: "Switch tabs to compare the working and bugged app.",
    placement: "bottom",
  },
  {
    target: "[data-tour='window-code']",
    title: "The console",
    content: "Check the code to find the bugs.",
    placement: "left",
  },
  {
    target: "[data-tour='cards']",
    title: "The cards",
    content: "Select one or multiple bugs which occur in the code.",
    placement: "top",
    highlightPadding: 20,
  },
  {
    target: "[data-tour='footer']",
    title: "Finish the game",
    content:
      "If you think you have selected the correct cards press the Finish button.",
    placement: "top",
    highlightPadding: 10,
  },
];

const GameTour = () => {
  const [updateGameSettings] = useMutation(updateGameSettingsDocument);
  const { data: gameData } = useLoaderData() as GameLoaderData;
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    if (gameData.me.settings?.gameSettings?.showTutorial) {
      setTourActive(true);
    }
  }, [gameData.me.settings?.gameSettings?.showTutorial]);

  return (
    <Tour
      steps={steps}
      active={tourActive}
      onStop={() => {
        updateGameSettings({
          variables: { showTutorial: false },
        });
        setTourActive(false);
      }}
    />
  );
};

export default GameTour;
