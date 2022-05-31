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
  const { time, location, setLocation, gameClock } = useGameData();
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    gameClock.start();
    return () => {
      gameClock.stop();
    };
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
        <Sidebar location={location} setMapOpen={setMapOpen} />

        {/* <h1>Game Page Aul suka titid gede</h1> */}

        <LocationModal
          mapOpen={mapOpen}
          setMapOpen={setMapOpen}
          handleLocationChange={handleLocationChange}
        />
      </main>
    </div>
  );
};

function Sidebar({
  location,
  setMapOpen,
}: {
  location: LocationType;
  setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, toggleStatus } = useUser();
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
            {location.actions.map((loc, idx) => (
              <Button
                key={idx}
                active={user.status[loc.status.name].state.isActive}
                onClick={() => toggleStatus(loc.status.name)}
              >
                {loc.name}
              </Button>
            ))}
            <Button
              color="bg-blue-500 hover:bg-blue-400"
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

type LocationModalProps = {
  mapOpen: boolean;
  setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLocationChange: (idx: number) => void;
};

function LocationModal({
  mapOpen,
  setMapOpen,
  handleLocationChange,
}: LocationModalProps) {
  return (
    <OverlayModal
      title="Choose Location"
      isOpen={mapOpen}
      onClose={() => setMapOpen(false)}
      className="col-start-3 col-end-4"
      disableFloat={true}
    >
      {LocationData.map((loc, idx) => (
        <Button onClick={() => handleLocationChange(idx)}>{loc.name}</Button>
      ))}
    </OverlayModal>
  );
}
