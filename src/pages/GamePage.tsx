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
import { Player } from "@/lib/@types";
import bgImg from "@/assets/background/test.jpg";

export const GamePage = () => {
  const navigate = useNavigate();
  const { updateStatus } = useUser();
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
      <TopBar
        clock={format(time, "HH:mm")}
        date={format(time, "E, dd MMMM yyyy")}
        onClick={() => navigate("/")}
      />
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm">
        <Sidebar />
        {/* <h1>Game Page Aul suka titid gede</h1> */}
      </main>
    </div>
  );
};

function Sidebar() {
  const { user, updateStatus, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;
  return (
    <div className="flex flex-col gap-4">
      <GreetingsBar userName={user.name} userMajor={user.major} />
      <div id="ProgressBar" className="grow">
        <ProgressGroup>
          <ProgressBar value={belajar.status.val} icon="dashicons:book" />
          <ProgressBar value={tidur.status.val} icon="fa-solid:bed" />
          <ProgressBar value={makan.status.val} icon="ion:fast-food" />
          <ProgressBar value={main.status.val} icon="fa:gamepad" />
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
  );
}
