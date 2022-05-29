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
        status: {
          name: "belajar",
          growth: 1,
        }
      },
      {
        name: "Makan",
        status: {
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
        status: {
          name: "tidur",
          growth: 1,
        }
      },
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
          growth: 1,
        }
      }
    ]
  },
]