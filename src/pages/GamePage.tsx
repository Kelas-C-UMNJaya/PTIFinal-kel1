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

type NewsType = {
  title: string;
  description: string;
  publishedAt: string;
  // id: string;
  source: {
    name: string;
    id: string;
  };
}

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

  

  //title, description, publishedAt

  //fetch data and store it in a state
  const [newsApi, setNewsApi] = useState<NewsType[]>([]);
  const [data, setData] = useState<NewsType[]>([]);

  let newsInterval: NodeJS.Timer;
  
  async function fetchNews() {
    const url = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=2b36ad8a386149b9b1c95942d736a457';
    try {
      let res = await axios.get(url)
      if(res.status === 200){
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
    fetchNews().then(data => {
      setStart(true);
    })
  }, [])

  useEffect(() => {
    if(start && index < newsApi.length){
      console.log(start);
      newsInterval = setInterval(() => {
        setData(prev => [...prev, newsApi[index]]);
        setIndex(index + 1);
      }, 1000);
    } else {
      clearInterval(newsInterval);
    }
    return () => clearInterval(newsInterval);
  }, [start, index])

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
          <NewsModal newsData={data} open={newsOpen} setOpen={setNewsOpen} />
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

const NewsModal = ({
  newsData,
  open,
  setOpen,
}: {
  newsData: NewsType[];
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}) => {
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

      {newsData.map((news, idx) => (
        <div key={idx} className="flex flex-col">
            <a href="#" className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-700" >
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{news.title}</h6>
            <p className="font-normal text-gray-700 dark:text-gray-400 truncate">{news.description}</p>
            <p className="text-slate-50 dark:text-slate-50 mt-2">{news.publishedAt}</p>
            <p className="text-slate-50 dark:text-slate-50 mt-2">{news.source.name}</p>
            </a>
        </div>
      ))}
      
    </OverlayModal>
  );
};
