import { addSeconds, format } from "date-fns";
import { useState, useEffect, createContext, useContext } from "react";
import { GameContextType, ProviderProps } from "./@types";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameData must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(new Date());
  const updateTime = () => {
    setTime((prevTime) => addSeconds(prevTime, 1));
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
