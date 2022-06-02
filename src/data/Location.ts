import { LocationType } from "@/lib/@types"
import umnBg from "@/assets/background/umn-siang.jpg"
import testBg from "@/assets/background/test.jpg"
import holywingsBg from "@/assets/background/test2.jpg"
import {useGameData} from "@/lib/GameContext"
import { isWithinInterval } from "date-fns"

export const isStillTime = (clockNow: number, time: {start: number, end: number} | undefined) => {
  if (time === undefined) return true
  return isWithinInterval(clockNow, {start: time.start, end: time.end});
}

export const Location: LocationType[] = [
  {
    name: "Rumah",
    bgImg: testBg,
    actions: [
      {
        name: "Tidur",
        status: {
          name: "tidur",
          growth: 0.2,
          shrink: 0.1,
        }
      },
      {
        name: "Main",
        status: {
          name: "main",
          growth: 0.6,
          shrink: 0.1,
        }
      },
      {
        name: "Makan",
        status: {
          name: "makan",
          growth: 10,
          shrink: 0.4,
        }
      }
    ]
  },
  {
    name: "Kampus",
    bgImg: umnBg,
    // time: {
    //   start: 7,
    //   end: 18
    // },
    actions: [
      {
        name: "Kuliah",
        status: {
          name: "belajar",
          growth: 0.4,
          modal: "matkul"
        }
      },
      {
        name: "Makan",
        status: {
          name: "makan",
          growth: 2,
        }
      },
    ]
  },
  {
    name: "HolyWings",
    bgImg: holywingsBg,
    actions: [
      {
        name: "Main",
        status: {
          name: "main",
          growth: 1,
        }
      },
      {
        name: "Makan",
        status: {
          name: "makan",
          growth: 4,
        }
      }
    ]
  },
]