import { Icon } from "@iconify/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useWeather } from "@/lib/useWeather";
import { WeatherType } from "@/lib/@types";

type Props = {
  clock: string;
  date: string;
  onClick: () => void;
  weatherData: WeatherType | undefined;
};

type ButtonProps = {
  onClick?: () => void;
};

const PauseButton = ({ onClick }: ButtonProps) => (
  <div className="flex lg:flex-1 justify-end items-center lg:ml-auto ">
    <div className="hover:text-slate-400 text-slate-300 text-2xl cursor-pointer transition">
      <Icon onClick={onClick} icon="carbon:pause-filled" />
    </div>
  </div>
);

const WeatherBar = ({
  weatherData,
}: {
  weatherData: WeatherType | undefined;
}) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-1 gap-2 justify-center items-center">
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather.icon}.png`}
        alt="weather"
        className="h-8"
      />
      <p className="text-s text-slate-300 font-bold hidden lg:block">
        {weatherData.weather.main}
      </p>
      <p className="text-s text-slate-300">{weatherData.temp}°C</p>
    </div>
  );
};

export const TopBar = ({
  clock,
  date,
  onClick,
  weatherData,
  ...props
}: Props) => {
  return (
    <div
      className="bg-gray-800 text-white rounded-b-lg flex px-4 py-2 h-12 lg:h-9"
      {...props}
    >
      <div className="flex flex-1 items-center gap-3 mr-auto">
        <p className="text-xl font-bold">{clock}</p>
        <p className="lg:text-sm text-xs">{date}</p>
      </div>
      <WeatherBar weatherData={weatherData} />
      <PauseButton onClick={onClick} />
    </div>
  );
};
