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
import axios from "axios";
import React from 'react';


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
      className={`h-screen relative bg-cover flex flex-col`}
      style={{
        backgroundImage: `url(${location.bgImg})`,
      }}
    >
          <TopBar
            clock={format(time, "HH:mm")}
            date={format(time, "E, dd MMMM yyyy")}
            onClick={() => navigate("/")}
          />
        <main className="p-6 grid grid-cols-1 grid-row-2 lg:grid-cols-3 grow backdrop-blur-sm shrink">
          <Sidebar
            location={location}
            setMapOpen={setMapOpen}
            setNewsOpen={setNewsOpen}
          />
          {/* <h1>Game Page AUL suka TITID GEDE (>15cm) </h1> */}
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
  className,
  location,
  setMapOpen,
  setNewsOpen,
}: {
  className?: string;
  location: LocationType;
  setMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewsOpen: React.Dispatch<boolean>;
}) {
  const { user, toggleStatus } = useUser();
  const { belajar, makan, main, tidur } = user.status;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
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

//https://newsapi.org/v2/everything?q=Apple&from=2022-05-31&sortBy=popularity&apiKey=c801e6ec5fbb42ca9079e3eb645db8ad

const NewsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}) => {
  type NewsType = {
    title: string;
    description: string;
    publishedAt: string;
    // id: string;
  }

  const [data, setData] = useState<NewsType[]>([]);

  const url = 'https://newsapi.org/v2/everything?q=Apple&from=2022-05-31&sortBy=popularity&apiKey=c801e6ec5fbb42ca9079e3eb645db8ad';

  //title, description, publishedAt

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setData(res.data.articles);
      })
  }, []);

  return (
    <OverlayModal
      title="News"
      onClose={() => setOpen(false)}
      isOpen={open}
      className="col-start-3 col-end-4 overflow-y-auto overflow-x-hidde"
      disableFloat={true}
    >
      {/* TODO: print newsnya disini, kasih bentuk card gitu
      (kalo bisa, bikin component terpisah untuk cardnya) */}

      {data && data.map(news => (
        <a href="#" className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-700">
        <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{news.title}</h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">{news.description}</p>
        <p className="text-gray-600 dark:text-gray-400">{news.publishedAt}</p>
        </a>
      ))}
    </OverlayModal>
  );
};
