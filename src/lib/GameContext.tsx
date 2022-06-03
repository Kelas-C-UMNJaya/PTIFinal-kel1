import {
  addHours,
  addMinutes,
  startOfToday,
  startOfWeek,
  addWeeks,
  isWithinInterval,
} from "date-fns";
import { useState, createContext, useContext, useEffect } from "react";
import {
  GameContextType,
  ProviderProps,
  LocationType,
  GameClockType,
} from "./@types";
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

const gameClock = () => {
  const startTime = startOfWeek(startOfToday());
  const endTime = addWeeks(startTime, 1);

  const { updateStatus } = useUser();
  const [time, setTime] = useState(startTime);
  const [finish, setFinish] = useState(false);
  let interval: NodeJS.Timer;
  const updateTime = () => {
    setTime((prevTime) => addMinutes(prevTime, 5));
  };

  let clockRun: boolean = false;

  const callback = () => {
    updateStatus();
    updateTime();
  };

  const startClock = () => {
    interval = setInterval(callback, 1000);
    return interval;
  };

  const resetClock = () => {
    clearInterval(interval);
    setTime(startOfWeek(startOfToday()));
  };

  const changeVal = (date: Date) => {
    setTime(date);
  };

  const changeClock = (hour: number) => {
    setTime(addHours(time, hour));
  };

  const stopClock = () => {
    clearInterval(interval);
  };

  useEffect(() => {
    setFinish(!isWithinInterval(time, { start: startTime, end: endTime }));
  }, [time]);

  const returnType: GameClockType = {
    time,
    isActive: clockRun,
    start: startClock,
    stop: stopClock,
    change: changeClock,
    reset: resetClock,
    isFinish: finish,
    changeVal,
    callback,
  };

  return returnType;
};

export const GameProvider = ({ children }: ProviderProps) => {
  const [location, setLocation] = useState<LocationType>(LocationData[0]);

  const GameData: GameContextType = {
    location,
    setLocation,
    gameClock: gameClock(),
  };

  return (
    <GameContext.Provider value={GameData}>{children}</GameContext.Provider>
  );
};
