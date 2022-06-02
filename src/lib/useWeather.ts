import { useState } from "react";
import { WeatherType } from "./@types";
import axios from "axios";

export const useWeather = () => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=-6&lon=106&appid=c4f20795b22d9933d772b5548880bcfd&units=metric";
  const [weatherData, setWeather] = useState<WeatherType | undefined>();
  const [received, setReceived] = useState<Date>();

  const fetchWeather = async () => {
    try {
      let res = await axios.get(url);
      if (res.status === 200) {
        setWeather({
          temp: res.data.main.temp,
          weather: res.data.weather[0],
        });
        setReceived(new Date());
        return 1;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { weatherData, fetchWeather, setWeather, received };
};
