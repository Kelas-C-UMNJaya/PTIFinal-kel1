import { Button } from "./components/Button";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useEffect } from "react";
import { useGameData } from "./lib/GameContext";
import { useNews } from "@/lib/useNews";
import { useWeather } from "@/lib/useWeather";
import { useStorage } from "@/lib/useStorage";

function App() {
  const { news, isAvailable: isNewsAvailable } = useNews();
  const { weatherData } = useWeather();
  const { getFromLocalStorage } = useStorage();

  return <Outlet />;
}

export default App;
