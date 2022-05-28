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
import { Player } from "@/lib/UserContext";
import bgImg from "@/assets/background/test.jpg";

type SidebarProps = {
  user: Player;
  updateStatus: () => void;
  toggleStatus: (val: keyof Player["status"]) => void;
};

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
      <TopBar
        clock={format(time, "HH:mm")}
        date={format(time, "E, dd MMMM yyyy")}
        onClick={() => navigate("/")}
      />
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm">
        <Sidebar {...{ user, updateStatus, toggleStatus }} />
        {/* <h1>Game Page Aul suka titid gede</h1> */}
      </main>
    </div>
  );
};

function Sidebar({ user, updateStatus, toggleStatus }: SidebarProps) {
  return (
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
  );
}
