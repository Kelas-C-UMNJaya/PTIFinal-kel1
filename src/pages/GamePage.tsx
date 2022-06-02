import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useGameData } from "@/lib/GameContext";
import { format, parseISO } from "date-fns";
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
import axios from "axios";
import React from "react";

type NewsType = {
  title: string;
  description: string;
  publishedAt: string;
  // id: string;
  source: {
    name: string;
    id: string;
  };
};

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
  const { location, setLocation, gameClock } = useGameData();
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
    if (isStillTime(gameClock.time.getHours(), LocationData[idx].time)) {
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

  //title, description, publishedAt

  //fetch data and store it in a state
  const [newsApi, setNewsApi] = useState<NewsType[]>([]);
  const [data, setData] = useState<NewsType[]>([]);

  let newsInterval: NodeJS.Timer;

  async function fetchNews() {
    const url =
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=2b36ad8a386149b9b1c95942d736a457";
    try {
      let res = await axios.get(url);
      if (res.status === 200) {
        setNewsApi(res.data.articles);
      }
      return res.data.articles;
    } catch (err) {
      console.log(err);
    }
  }

  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  useEffect(() => {
    fetchNews().then(() => {
      setStart(true);
    });
  }, []);

  useEffect(() => {
    if (start && index < newsApi.length) {
      newsInterval = setInterval(() => {
        setData((prev) => [newsApi[index], ...prev]);
        setIndex(index + 1);
      }, 30000);
    } else {
      clearInterval(newsInterval);
    }
    return () => clearInterval(newsInterval);
  }, [start, index]);

  return (
    <div
      className={`h-screen relative bg-cover flex flex-col`}
      style={{
        backgroundImage: `url(${location.bgImg})`,
      }}
    >
      <TopBar
        clock={format(gameClock.time, "HH:mm")}
        date={format(gameClock.time, "E, dd MMMM yyyy")}
        onClick={() => navigate("/")}
      />

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow backdrop-blur-sm gap-3">
        <Sidebar location={location} setOpenModal={handleClickModal} />

        {/* <h1>Game Page Aul suka titid gede</h1> */}

        <AvatarBody
          className="hidden lg:flex col-start-2 col-end-3"
          head={user.avatar}
        />
        <LocationModal
          mapOpen={openModal.location}
          setMapOpen={() => setOpenModal({ ...openModal, location: false })}
          handleLocationChange={handleLocationChange}
        />
        <NewsModal
          newsData={data}
          open={openModal.news}
          setOpen={handleClickModal}
        />
        <MatkulModal open={openModal.matkul} setOpen={handleClickModal} />
      </main>
    </div>
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

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <GreetingsBar
        userName={user.name}
        userMajor={user.major.name}
        userImg={user.avatar}
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
  const { gameClock } = useGameData();
  return (
    <OverlayModal
      title="Choose Location"
      isOpen={mapOpen}
      onClose={() => setMapOpen()}
      className="col-start-3 col-end-4"
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
  open,
  setOpen,
}: {
  newsData: NewsType[];
  open: boolean;
  setOpen: (modal: keyof ModalType, value: boolean) => void;
}) => {
  return (
    <OverlayModal
      title="News"
      onClose={() => setOpen("news", false)}
      isOpen={open}
      className="col-start-3 col-end-4 overflow-y-auto overflow-x-hidde"
      disableFloat={true}
    >
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
