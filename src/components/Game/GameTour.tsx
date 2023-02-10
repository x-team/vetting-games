import { useMutation } from "@apollo/client";
import Tour from "@components/Tour/Tour";
import { TourStep } from "@components/Tour/useTour";
import { GameLoaderData, updateGameSettingsDocument } from "@pages/Game";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useOverlayTriggerState } from "react-stately";
import { useGameTour } from "./GameTourContext";
import GameTourModal from "./GameTourModal";

const steps: TourStep[] = [
  {
    target: "[data-tour='window-tab-app']",
    title: "The time tracker",
    content: "Compare the working version versus the broken code.",
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
  const showTutorial =
    gameData.me.settings?.gameSettings?.showTutorial || false;
  const { tourActive, setTourActive } = useGameTour();
  const [tourOpen, setTourOpen] = useState(false);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const modalState = useOverlayTriggerState({ isOpen: tourModalOpen });

  useMemo(() => {
    if (tourActive) setTourModalOpen(true);
  }, [tourActive]);

  useEffect(() => {
    if (!showTutorial) return;
    setTourActive(true);
    modalState.open();
  }, [showTutorial, modalState.isOpen]);

  return (
    <>
      <GameTourModal
        state={modalState}
        onStart={() => {
          setTourOpen(true);
          setTourModalOpen(false);
        }}
      />
      <Tour
        steps={steps}
        active={tourOpen}
        onStop={() => {
          updateGameSettings({
            variables: { showTutorial: false },
          });
          setTourOpen(false);
          setTourActive(false);
        }}
      />
    </>
  );
};

export default GameTour;
