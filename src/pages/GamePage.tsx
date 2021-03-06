import { NewsType, ModalType } from "./../lib/@types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useGameData } from "@/lib/GameContext";
import { addDays, format, parseISO, isSameDay, getHours } from "date-fns";
import {
  TopBar,
  GreetingsBar,
  ProgressBar,
  ProgressGroup,
  Button,
  ButtonGroup,
  OverlayModal,
  AvatarBody,
  PauseMenu,
} from "@/components";
import { LocationType, MatkulType } from "@/lib/@types";
import { Location as LocationData, isStillTime } from "@/data/Location";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useNews } from "@/lib/useNews";
import { useWeather } from "@/lib/useWeather";
import { useStorage } from "@/lib/useStorage";
import { rainBg } from "@/assets/background";

type LocationModalProps = {
  setMapOpen: () => void;
  handleLocationChange: (idx: number) => void;
};

export const GamePage = () => {
  const navigate = useNavigate();
  const { location, setLocation, gameClock } = useGameData();
  const { user, toggleStatus } = useUser();
  const [openModal, setOpenModal] = useState<ModalType>({
    news: false,
    location: false,
    matkul: false,
    debug: false,
  });
  const [bgImg, setBgImg] = useState<string>();
  const [bgRain, setBgRain] = useState<boolean>(false);

  const [pause, setPause] = useState(false);
  const { news, fetchNews } = useNews();
  const { weatherData, fetchWeather } = useWeather();
  const [today, setToday] = useState<Date>(gameClock.time);
  const storage = useStorage();
  const { updateTotal } = useUser();

  function handleKeyDebug(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.code === "F6") {
      handleClickModal("debug", true);
    }
  }

  useEffect(() => {
    storage.getUser();
    document.addEventListener("keydown", handleKeyDebug);
    return () => {
      document.removeEventListener("keydown", handleKeyDebug);
    };
  }, []);

  useEffect(() => {
    pause ? gameClock.stop() : gameClock.start();
    return () => gameClock.stop();
  }, [pause]);

  useEffect(() => {
    if (gameClock.isFinish) {
      gameClock.stop();
      gameClock.reset();
      navigate("/finish");
    }
  }, [gameClock.isFinish]);

  useEffect(() => {
    fetchNews();
    fetchWeather();
    setToday(gameClock.time);
  }, []);

  useEffect(() => {
    if (!isSameDay(gameClock.time, today)) {
      if (user.name !== "") {
        storage.saveUser();
      }
      updateTotal();
      fetchWeather();
      setToday(gameClock.time);
    }
  }, [user, location]);

  useEffect(() => {
    let hour = getHours(gameClock.time);
    if (hour > 6 && hour < 18) {
      setBgImg(location.bgImg.day);
    } else {
      setBgImg(location.bgImg.night);
    }
    if (
      typeof weatherData !== "undefined" &&
      weatherData?.weather?.id <= 700 &&
      weatherData?.weather?.id > 800
    ) {
      setBgRain(false);
    } else {
      setBgRain(true);
    }
  }, [gameClock.time, location]);

  function handleLocationChange(idx: number) {
    if (isStillTime(gameClock.time.getHours(), LocationData[idx].time)) {
      toggleStatus();
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
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className={`h-screen relative flex flex-col bg-cover overflow-x-none transition-all`}
    >
      {bgRain && (
        <div
          className="-z-10 absolute inset-0"
          style={{
            backgroundImage: `url(${rainBg})`,
          }}
        />
      )}
      <div
        className="-z-20 absolute inset-0"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      />
      <TopBar
        clock={format(gameClock.time, "HH:mm")}
        date={format(gameClock.time, "E, dd MMMM yyyy")}
        onClick={() => setPause(true)}
        weatherData={weatherData}
      />

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grid-rows-1 grow backdrop-blur-sm gap-3 overflow-hidden">
        <Sidebar location={location} setOpenModal={handleClickModal} />

        <AvatarBody
          className="hidden lg:flex col-start-2 col-end-3"
          head={user.avatar}
        />
        <div className="lg:col-start-3 lg:col-end-4">
          <AnimatePresence exitBeforeEnter>
            {openModal.location && (
              <LocationModal
                key="Location"
                setMapOpen={() =>
                  setOpenModal({ ...openModal, location: false })
                }
                handleLocationChange={handleLocationChange}
              />
            )}
            {openModal.news && (
              <NewsModal
                key="News"
                newsData={news}
                setOpen={handleClickModal}
              />
            )}
            {openModal.matkul && (
              <MatkulModal key="Matkul" setOpen={handleClickModal} />
            )}

            {openModal.debug && (
              <DebugModal key="Debug" setOpen={handleClickModal} />
            )}

            {pause && <PauseMenu key="Pause" setOpen={() => setPause(false)} />}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
};

function Sidebar({
  className,
  location,
  setOpenModal,
}: {
  className?: string;
  location: LocationType;
  setOpenModal: (modal: keyof ModalType, value: boolean) => void;
}) {
  const { user, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;
  const { gameClock } = useGameData();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <GreetingsBar
        userName={user.name}
        userMajor={user.major.name}
        userImg={user.avatar}
        currentTime={gameClock.time}
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
        <ButtonGroup className="overflow-y-auto">
          <AnimatePresence>
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
            <div className="flex flex-col md:flex-row justify-evenly gap-3">
              <Button
                color="bg-blue-500 hover:bg-blue-400"
                onClick={() => setOpenModal("location", true)}
                className="grow"
              >
                Change Location
              </Button>
              <Button
                color="bg-yellow-600 hover:bg-yellow-500"
                onClick={() => setOpenModal("news", true)}
                className="grow"
              >
                News
              </Button>
            </div>
          </AnimatePresence>
        </ButtonGroup>
      </div>
    </div>
  );
}

function LocationModal({
  setMapOpen,
  handleLocationChange,
}: LocationModalProps) {
  const { gameClock } = useGameData();
  return (
    <OverlayModal
      title="Choose Location"
      onClose={() => setMapOpen()}
      disableFloat={true}
    >
      {LocationData.map((loc, idx) => {
        let isActive = isStillTime(gameClock.time.getHours(), loc.time);
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
  newsData,
  setOpen,
}: {
  newsData: NewsType[];
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  const { isAvailable } = useNews();
  return (
    <OverlayModal
      title="News"
      onClose={() => setOpen("news", false)}
      disableFloat={true}
    >
      <div className="overflow-hidden overflow-y-auto flex flex-col gap-5">
        {newsData.map((news, idx) => (
          <div key={idx} className="flex flex-col">
            <a
              href="#"
              className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-700"
            >
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {news.title}
              </h6>
              <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
                {news.description}
              </p>
              <p className="text-slate-50 dark:text-slate-50 mt-2">
                {format(parseISO(news.publishedAt), "dd MMMM yyyy")}
              </p>
              <p className="text-slate-50 dark:text-slate-50 mt-2">
                {news.source.name}
              </p>
            </a>
          </div>
        ))}
      </div>
    </OverlayModal>
  );
};

const MatkulModal = ({
  setOpen,
}: {
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  const { user } = useUser();
  const { gameClock, setLocation } = useGameData();

  const handleMatkulChange = (matkul: MatkulType) => {
    user.status.belajar.dispatch({
      type: "setVal",
      payload: matkul.val,
    });
    if (
      !isStillTime(
        gameClock.time.getHours() + matkul.duration,
        LocationData[1].time
      )
    ) {
      setLocation(LocationData[0]);
    }
    gameClock.change(matkul.duration);
    setOpen("matkul", false);
  };

  return (
    <OverlayModal
      title="Mata Kuliah"
      onClose={() => setOpen("matkul", false)}
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

const DebugModal = ({
  setOpen,
}: {
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  const { gameClock } = useGameData();
  const { user, resetUser } = useUser();
  const { isAvailable } = useNews();

  const handleReset = () => {
    gameClock.reset();
    resetUser();
  };

  return (
    <OverlayModal
      title="Debug"
      onClose={() => setOpen("debug", false)}
      disableFloat={true}
    >
      <p>Is done?: {gameClock.isFinish ? "yes" : "no"}</p>
      <p>belajar: {user.status.belajar.state.total}</p>
      <p>tidur: {user.status.tidur.state.total}</p>
      <p>makan: {user.status.makan.state.total}</p>
      <p>main: {user.status.main.state.total}</p>

      <Button onClick={handleReset}>Reset Clock</Button>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            gameClock.change(-1);
          }}
        >
          -1 hour
        </Button>

        <Button
          onClick={() => {
            gameClock.change(1);
          }}
        >
          +1 hour
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            gameClock.changeVal(addDays(gameClock.time, -1));
          }}
        >
          -1 day
        </Button>

        <Button
          onClick={() => {
            gameClock.changeVal(addDays(gameClock.time, 1));
          }}
        >
          +1 day
        </Button>
      </div>
    </OverlayModal>
  );
};
