import { addMinutes, format, startOfToday } from "date-fns";
import { useState, useEffect, createContext, useContext } from "react";
import { GameContextType, ProviderProps, LocationType } from "./@types";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameData must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [time, setTime] = useState(startOfToday());
  const updateTime = () => {
    setTime((prevTime) => addMinutes(prevTime, 1));
  };
  const GameData: GameContextType = {
    time,
    location,
    updateTime,
  };

  return (
    <GameContext.Provider value={GameData}>{children}</GameContext.Provider>
  );
};
