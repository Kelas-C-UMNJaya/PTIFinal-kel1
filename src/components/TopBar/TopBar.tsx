import { Icon } from "@iconify/react";
import axios from "axios";
import { useState, useEffect } from "react";


type Props = {
  clock: string;
  date: string;
  onClick: () => void;
};

type ButtonProps = {
  onClick?: () => void;
};

const PauseButton = ({ onClick }: ButtonProps) => (
  <div
    className="flex flex-1 justify-end ml-auto "
  >
    <div className="hover:text-slate-400 text-slate-300 text-2xl cursor-pointer transition">
      <Icon onClick={onClick} icon="carbon:pause-filled" />
    </div>
  </div>
);

//=========================================================

//API current = https://api.openweathermap.org/data/2.5/weather?lat=-6&lon=106&appid=c4f20795b22d9933d772b5548880bcfd
//temp, weather

const WeatherBar = () => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-6&lon=106&appid=c4f20795b22d9933d772b5548880bcfd&units=metric';
  const [weatherData, setWeather] = useState({
    temp: 0,
    weather: {
      main: '',
      description: '',
      icon: ''
    },
  });

  useEffect(() => {
    axios.get(url).then(res => {
      setWeather({
        temp: res.data.main.temp,
        weather: res.data.weather[0]
      })
      console.log(res.data);
    });
  }
  , []);

  return (
    <div className="flex flex-1 gap-2 justify-center items-center">
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather.icon}.png`} alt="weather" className="h-8"/>
      <p className="text-s text-slate-300 font-bold">{weatherData.weather.main}</p>
      <p className="text-s text-slate-300">{weatherData.temp}°C</p>
    </div>
  );
};


//=========================================================

export const TopBar = ({ clock, date, onClick, ...props }: Props) => {
  return (
    <div
      className="bg-gray-800 text-white rounded-b-lg flex px-4 py-2 h-9"
      {...props}
    >
      <div className="flex flex-1 items-center gap-3 mr-auto">
        <p className="text-xl font-bold">{clock}</p>
        <p className="text-sm">{date}</p>
      </div>
      <WeatherBar />
      <PauseButton onClick={onClick} />
    </div>
  );
};
