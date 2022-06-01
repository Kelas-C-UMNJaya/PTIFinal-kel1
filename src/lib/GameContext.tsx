import { addHours, addMinutes, format, startOfToday } from "date-fns";
import { useState, useEffect, createContext, useContext } from "react";
import { GameContextType, ProviderProps, LocationType } from "./@types";
import { useUser } from "@/lib/UserContext";

import { Location as LocationData } from "@/data/Location";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameData must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState<LocationType>(LocationData[0]);
  const [clockRun, setClockRun] = useState<boolean>(true);
  const [time, setTime] = useState(startOfToday());
  let interval: NodeJS.Timer;
  const updateTime = () => {
    setTime((prevTime) => addMinutes(prevTime, 1));
  };

  const { updateStatus } = useUser();

  const startClock = () => {
    interval = setInterval(() => {
      updateStatus();
      updateTime();
    }, 1000);
    setClockRun(true);
    console.log(`Clock run is now ${clockRun}`);
  };

  const changeClock = (hour: number) => {
    setTime(addHours(time, hour));
  };

  // TODO: Fixed the pause clock behaviour
  const stopClock = () => {
    clearInterval(interval);
    setClockRun(false);
    console.log(`Clock run is now ${clockRun}`);
  };

  const GameData: GameContextType = {
    time,
    location,
    updateTime,
    setLocation,
    gameClock: {
      status: clockRun,
      val: time,
      start: startClock,
      change: changeClock,
      stop: stopClock,
    },
  };

  return (
    <GameContext.Provider value={GameData}>{children}</GameContext.Provider>
  );
};
