import React from "react";
import {
  Player,
  GameContextType,
  NewsType,
  WeatherType,
  StatusReturn,
  LocationType,
} from "@/lib/@types";
import { useUser } from "./UserContext";
import { useGameData } from "./GameContext";
import { useNews } from "./useNews";
import { useWeather } from "./useWeather";

type LocalStorageType = {
  user: Player;
  gameData: {
    location: LocationType;
    gameClock: Date;
  };
};

export const useStorage = () => {
  const [localStorage, setLocalStorage] =
    React.useState<LocalStorageType | null>(() => {
      try {
        const data = window.localStorage.getItem("data");
        return data ? JSON.parse(data) : null;
      } catch (err) {
        console.log(err);
        return null;
      }
    });
  const { user, changeData } = useUser();
  const { location, setLocation, gameClock } = useGameData();
  const {
    weatherData,
    setWeather,
    fetchWeather,
    received: weatherReceived,
  } = useWeather();
  const {
    news,
    fetchNews,
    isAvailable,
    setIsAvailable,
    setNewsApi,
    received: newsReceived,
  } = useNews();

  const getUser = (): boolean => {
    if (localStorage === null) return false;
    console.log(localStorage.gameData.gameClock);
    changeData(localStorage.user);
    let val: keyof Player["status"];
    for (val in localStorage.user.status) {
      user.status[val].dispatch({
        type: "setVal",
        payload: localStorage.user.status[val].state.val,
      });
      user.status[val].dispatch({
        type: "setTotal",
        payload: localStorage.user.status[val].state.total,
      });
    }
    setLocation(localStorage.gameData.location);
    // setWeather(localStorage.weather.data);
    // setNewsApi(localStorage.news.data);
    setIsAvailable(true);
    gameClock.changeVal(new Date(localStorage.gameData.gameClock));
    return true;
  };

  const saveUser = () => {
    const data: LocalStorageType = {
      user: user,
      gameData: {
        location: location,
        gameClock: gameClock.time,
      },
    };
    setLocalStorage(data);
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  const reset = () => {
    setLocalStorage(null);
    window.localStorage.removeItem("data");
  };

  return { localStorage, getUser, saveUser, reset };
};
