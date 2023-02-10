// Create a context that switches a tour on and off

import { createContext, ReactNode, useContext, useState } from "react";

const GameTourContext = createContext({
  tourActive: false,
  setTourActive: (_active: boolean): void => {
    throw new Error("GameTourContext not set");
  },
});

const GameTourProvider = ({ children }: { children: ReactNode }) => {
  const [tourActive, setTourActive] = useState(false);

  const handleTourActive = (active: boolean) => {
    setTourActive(active);
  };

  return (
    <GameTourContext.Provider
      value={{ tourActive, setTourActive: handleTourActive }}
    >
      {children}
    </GameTourContext.Provider>
  );
};

const useGameTour = () => {
  const { tourActive, setTourActive } = useContext(GameTourContext);

  return { tourActive, setTourActive };
};

export { GameTourContext, GameTourProvider, useGameTour };
