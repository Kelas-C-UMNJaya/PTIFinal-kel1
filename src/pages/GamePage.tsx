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
import { LocationType, Player } from "@/lib/@types";
import { Location as LocationData } from "@/data/Location";

export const GamePage = () => {
  const navigate = useNavigate();
  const { updateStatus } = useUser();
  const { time, location, updateTime, setLocation } = useGameData();
  const [mapOpen, setMapOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateStatus();
      updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleLocationChange(idx: number) {
    setLocation(LocationData[idx]);
    setMapOpen(false);
  }

  return (
    <div
      className={`h-screen relative flex flex-col bg-cover`}
      style={{
        backgroundImage: `url(${location.bgImg})`,
      }}
    >
      <TopBar
        clock={format(time, "HH:mm")}
        date={format(time, "E, dd MMMM yyyy")}
        onClick={() => navigate("/")}
      />
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm">
        <Sidebar
          location={location}
          setMapOpen={setMapOpen}
          setNewsOpen={setNewsOpen}
        />
        {/* <h1>Game Page Aul suka titid gede</h1> */}
        <OverlayModal
          title="Choose Location"
          isOpen={mapOpen}
          onClose={() => setMapOpen(false)}
          className="col-start-3 col-end-4"
          disableFloat={true}
        >
          {LocationData.map((loc, idx) => (
            <Button onClick={() => handleLocationChange(idx)}>
              {loc.name}
            </Button>
          ))}
        </OverlayModal>
        <NewsModal open={newsOpen} setOpen={setNewsOpen} />
      </main>
    </div>
  );
};

function Sidebar({
  location,
  setMapOpen,
  setNewsOpen,
}: {
  location: LocationType;
  setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewsOpen: React.Dispatch<boolean>;
}) {
  const { user, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;

  return (
    <div className="flex flex-col gap-4">
      <GreetingsBar
        userName={user.name}
        userMajor={user.major}
        onClick={() => setNewsOpen(true)}
      />
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
          {location.actions.map(
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
            color="bg-blue-500 hover:bg-blue-400"
            onClick={() => setMapOpen(true)}
          >
            Change Location
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

const NewsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}) => {
  return (
    <OverlayModal
      title="News"
      onClose={() => setOpen(false)}
      isOpen={open}
      className="col-start-3 col-end-4"
      disableFloat={true}
    >
      {/* TODO: print newsnya disini, kasih bentuk card gitu
      (kalo bisa, bikin component terpisah untuk cardnya) */}
    </OverlayModal>
  );
};
