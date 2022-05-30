import { useState, useEffect } from "react";
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
  OverlayModal,
} from "@/components";
import { Player } from "@/lib/@types";
import { Location } from "@/data/Location";

export const GamePage = () => {
  const navigate = useNavigate();
  const { updateStatus } = useUser();
  const { time, location, updateTime } = useGameData();
  const [mapOpen, setMapOpen] = useState(false);
  const [locIdx, setLocIdx] = useState(0);

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
        backgroundImage: `url(${Location[locIdx].bgImg})`,
      }}
    >
      <TopBar
        clock={format(time, "HH:mm")}
        date={format(time, "E, dd MMMM yyyy")}
        onClick={() => navigate("/")}
      />
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm">
        <Sidebar locIdx={locIdx} setMapOpen={setMapOpen} />
        {/* <h1>Game Page Aul suka titid gede</h1> */}
        <OverlayModal
          title="Map"
          isOpen={mapOpen}
          onClose={() => setMapOpen(false)}
        >
          {Location.map((loc, idx) => (
            <Button
              onClick={() => {
                setLocIdx(idx);
                setMapOpen(false);
              }}
            >
              {loc.name}
            </Button>
          ))}
        </OverlayModal>
      </main>
    </div>
  );
};

function Sidebar({
  locIdx,
  setMapOpen,
}: {
  locIdx: number;
  setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, updateStatus, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;

  return (
    <div className="flex flex-col gap-4">
      <GreetingsBar userName={user.name} userMajor={user.major} />
      <div id="ProgressBar" className="grow">
        <ProgressGroup>
          <ProgressBar value={belajar.state.val} icon="dashicons:book" />
          <ProgressBar value={tidur.state.val} icon="fa-solid:bed" />
          <ProgressBar value={makan.state.val} icon="ion:fast-food" />
          <ProgressBar value={main.state.val} icon="fa:gamepad" />
        </ProgressGroup>
      </div>
      <div id="Button" className="mt-auto">
        <ButtonGroup>
          <ButtonGroup>
            {Location[locIdx].actions.map(
              (
                loc,
                idx // TODO: Ganti indexnya biar bisa pindah ke lokasi lain
              ) => (
                <Button
                  key={idx}
                  active={user.status[loc.status.name].state.isActive}
                  onClick={() => toggleStatus(loc.status.name)}
                >
                  {loc.name}
                </Button>
              )
            )}
            <Button
              className="bg-green-500 hover:bg-green-400"
              onClick={() => setMapOpen(true)}
            >
              Change Location
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}
