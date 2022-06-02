import { Button } from "./components/Button";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useEffect } from "react";
import { useGameData } from "./lib/GameContext";
import { useNews } from "@/lib/useNews";
import { useWeather } from "@/lib/useWeather";

function App() {
  return <Outlet />;
}

export default App;
