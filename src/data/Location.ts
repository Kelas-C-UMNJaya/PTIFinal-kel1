import { LocationType } from "@/lib/@types"
import umnBg from "@/assets/background/umn.jpg"
import testBg from "@/assets/background/test.jpg"

export const Location: LocationType[] = [
  {
    name: "Kampus",
    bgImg: umnBg,
    actions: [
      {
        name: "Kuliah",
        affectStatus: {
          name: "belajar",
          growth: 1,
        }
      },
      {
        name: "Makan",
        affectStatus: {
          name: "makan",
          growth: 1,
        }
      },
    ]
  },
  {
    name: "Rumah",
    bgImg: testBg,
    actions: [
      {
        name: "Tidur",
        affectStatus: {
          name: "tidur",
          growth: 1,
        }
      },
      {
        name: "Main",
        affectStatus: {
          name: "main",
          growth: 1,
        }
      }
    ]
  },
]