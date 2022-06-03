import { addHours, addMinutes, startOfToday } from "date-fns";
import { useState } from "react";
import { GameClockType } from "./@types";
import { useUser } from "@/lib/UserContext";

export const gameClock = () => {
  const { updateStatus } = useUser();
  const [time, setTime] = useState(startOfToday());
  let interval: NodeJS.Timer;
  const updateTime = () => {
    setTime((prevTime) => addMinutes(prevTime, 1));
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

  const changeClock = (hour: number) => {
    setTime(addHours(time, hour));
  };

  const stopClock = () => {
    clearInterval(interval);
  };

  const returnType: GameClockType = {
    time,
    isActive: clockRun,
    start: startClock,
    stop: stopClock,
    change: changeClock,
    callback,
  };

  return returnType;
};
