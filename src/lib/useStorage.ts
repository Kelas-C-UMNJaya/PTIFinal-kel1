import React from "react";
import { Player, GameContextType, NewsType, WeatherType } from "@/lib/@types";
import { useUser } from "./UserContext";

type LocalStorageType = {
  user: Player;
  gameData: GameContextType;
  news: {
    data: NewsType[];
    received: Date;
  };
  weather: {
    data: WeatherType;
    received: Date;
  };
};

export const useStorage = () => {
  const [localStorage, setLocalStorage] = React.useState<LocalStorageType>();
  const { user, changeData } = useUser();
};
