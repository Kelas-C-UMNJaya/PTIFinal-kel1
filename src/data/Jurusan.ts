import {JurusanType} from "@/lib/@types"

export const jurusan: JurusanType[] = [
  {
    name: "Teknik Informatika",
    matkul: [
      {
        name: "Kalkulus",
        val: 1,
        duration: 5
      },
      {
        name: "Perkenalan Teknologi Internet",
        val: 1,
        duration: 3
      },
      {
        name: "Algoritma Struktur Data",
        val: 1,
        duration: 3
      }
    ]
  },
  {
    name: "Teknik Elektro",
    matkul: [
      {
        name: "Matematika Teknik",
        val: 1,
        duration: 4
      },
      {
        name: "Fisika Elektro",
        val: 1,
        duration: 4
      },
      {
        name: "Probabilitas dan Statistika",
        val: 1,
        duration: 4
      }
    ]
  },
  {
    name: "Teknik Kimia",
    matkul: [
      {
        name: "Kimia Analisis",
        val: 1,
        duration: 4
      },
      {
        name: "Kimia Anorganik",
        val: 1,
        duration: 3
      },
      {
        name: "Matematika I",
        val: 1,
        duration: 4
      }
    ]
  },
  {
    name: "Ilmu Komunikasi",
    matkul: [
      {
        name: "Pengantar Ilmu Komunikasi",
        val: 1,
        duration: 4
      },
      {
        name: "Pengantar Periklanan",
        val: 1,
        duration: 3
      },
      {
        name: "Pengantar Public Relations",
        val: 1,
        duration: 4
      }
    ]
  }
]