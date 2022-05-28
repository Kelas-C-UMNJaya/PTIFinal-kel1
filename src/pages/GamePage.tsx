import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useGameData } from "@/lib/GameContext";
import { format } from "date-fns";
import {
  TopBar,
  GreetingsBar,
  ProgressBar,
  ProgressGroup,
  Button,
  ButtonGroup,
} from "@/components";
import bgImg from "@/assets/background/test.jpg";

export const GamePage = () => {
  const navigate = useNavigate();
  const { user, updateStatus, toggleStatus } = useUser();
  const { time, location, updateTime } = useGameData();
  useEffect(() => {
    const interval = setInterval(() => {
      updateStatus();
      updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`h-screen relative flex flex-col bg-cover`}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <nav className="sticky">
        <TopBar
          clock={format(time, "HH:mm")}
          date={format(time, "E, dd MMMM yyyy")}
          onClick={() => navigate("/")}
        />
      </nav>
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <GreetingsBar userName={user.name} userMajor={user.major} />
          <div id="ProgressBar" className="grow">
            <ProgressGroup>
              <ProgressBar value={50} icon="dashicons:book" />
              <ProgressBar value={50} icon="fa-solid:bed" />
              <ProgressBar value={50} icon="ion:fast-food" />
              <ProgressBar value={50} icon="fa:gamepad" />
            </ProgressGroup>
          </div>
          <div id="Button" className="mt-auto">
            <ButtonGroup>
              <Button>Belajar</Button>
              <Button>HolyWings</Button>
              <Button>Kembali ke rumah</Button>
            </ButtonGroup>
          </div>
        </div>
        {/* <h1>Game Page Aul suka titid gede</h1> */}
      </main>
    </div>
  );
};
