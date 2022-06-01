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
  AvatarBody,
} from "@/components";
import { LocationType, Player, MatkulType } from "@/lib/@types";
import { Location as LocationData, isStillTime } from "@/data/Location";
import { jurusan as JurusanData } from "@/data/Jurusan";

type ModalType = {
  news: boolean;
  location: boolean;
  matkul: boolean;
};
type LocationModalProps = {
  mapOpen: boolean;
  setMapOpen: () => void;
  handleLocationChange: (idx: number) => void;
};

export const GamePage = () => {
  const navigate = useNavigate();
  const { time, location, setLocation, gameClock } = useGameData();
  const { user } = useUser();
  const [openModal, setOpenModal] = useState<ModalType>({
    news: false,
    location: false,
    matkul: false,
  });

  useEffect(() => {
    gameClock.start();
    return () => {
      gameClock.stop();
    };
  }, []);

  function handleLocationChange(idx: number) {
    if (isStillTime(time.getHours(), LocationData[idx].time)) {
      setLocation(LocationData[idx]);
      setOpenModal({ ...openModal, location: false });
    }
  }

  function handleClickModal(modal: keyof ModalType, value: boolean) {
    let key: keyof ModalType;
    for (key in openModal) {
      openModal[key] = false;
    }
    setOpenModal({ ...openModal, [modal]: value });
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
        <Sidebar location={location} setOpenModal={handleClickModal} />

        {/* <h1>Game Page Aul suka titid gede</h1> */}

        <AvatarBody className="col-start-2 col-end-3" head={user.avatar} />
        <LocationModal
          mapOpen={openModal.location}
          setMapOpen={() => setOpenModal({ ...openModal, location: false })}
          handleLocationChange={handleLocationChange}
        />
        <NewsModal open={openModal.news} setOpen={handleClickModal} />
        <MatkulModal open={openModal.matkul} setOpen={handleClickModal} />
      </main>
    </div>
  );
};

function Sidebar({
  location,
  setOpenModal,
}: {
  location: LocationType;
  setOpenModal: (modal: keyof ModalType, value: boolean) => void;
}) {
  const { user, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;

  return (
    <div className="flex flex-col gap-4">
      <GreetingsBar
        userName={user.name}
        userMajor={user.major.name}
        onClick={() => setOpenModal("news", true)}
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
          <ButtonGroup>
            {location.actions.map((loc, idx) => (
              <Button
                key={idx}
                active={user.status[loc.status.name].state.isActive}
                onClick={() =>
                  loc.status.modal
                    ? setOpenModal("matkul", true)
                    : toggleStatus(loc.status.name)
                }
              >
                {loc.name}
              </Button>
            ))}
            <Button
              color="bg-blue-500 hover:bg-blue-400"
              onClick={() => setOpenModal("location", true)}
            >
              Change Location
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}

function LocationModal({
  mapOpen,
  setMapOpen,
  handleLocationChange,
}: LocationModalProps) {
  const { time } = useGameData();
  return (
    <OverlayModal
      title="Choose Location"
      isOpen={mapOpen}
      onClose={() => setMapOpen()}
      className="col-start-3 col-end-4"
      disableFloat={true}
    >
      {LocationData.map((loc, idx) => {
        let isActive = isStillTime(time.getHours(), loc.time);
        return (
          <Button
            key={idx}
            disabled={!isActive}
            onClick={() => handleLocationChange(idx)}
          >
            {loc.name}
          </Button>
        );
      })}
    </OverlayModal>
  );
}
const NewsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  return (
    <OverlayModal
      title="News"
      onClose={() => setOpen("news", false)}
      isOpen={open}
      className="col-start-3 col-end-4"
      disableFloat={true}
    >
      {/* TODO: print newsnya disini, kasih bentuk card gitu
      (kalo bisa, bikin component terpisah untuk cardnya) */}
    </OverlayModal>
  );
};

const MatkulModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  const { user } = useUser();
  const { gameClock } = useGameData();

  const handleMatkulChange = (matkul: MatkulType) => {
    user.status.belajar.dispatch({
      type: "setVal",
      payload: matkul.val,
    });
    gameClock.change(matkul.duration);
    setOpen("matkul", false);
  };

  return (
    <OverlayModal
      title="Mata Kuliah"
      onClose={() => setOpen("matkul", false)}
      isOpen={open}
      className="col-start-3 col-end-4"
      disableFloat={true}
    >
      {user.major.matkul.map((matkul, idx) => (
        <Button key={idx} onClick={() => handleMatkulChange(matkul)}>
          {matkul.name}
        </Button>
      ))}
    </OverlayModal>
  );
};
