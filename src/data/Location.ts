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
    name: "HolyWings",
    bgImg: testBg,
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