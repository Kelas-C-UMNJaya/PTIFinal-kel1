import axios from "axios";
import {useState, useEffect} from "react";
import { NewsType } from "./@types";

export const useNews = () => {
  const [newsApi, setNewsApi] = useState<NewsType[]>([]);
  const [data, setData] = useState<NewsType[]>([]);
  const [index, setIndex] = useState(1);
  const [start, setStart] = useState(false);

  let newsInterval: NodeJS.Timer;

  async function fetchNews() {
    const url =
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=2b36ad8a386149b9b1c95942d736a457";
    try {
      let res = await axios.get(url, {
        params: {
          pageSize: 100,
        }
      });
      if (res.status === 200) {
        setNewsApi(res.data.articles);
      }
      setStart(true);
    } catch (err) {
      console.log(err);
    }
  }

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
  
  return { news: data, fetchNews, isAvailable: start };
}