import { JurusanType } from "@/lib/@types";

export const jurusan: JurusanType[] = [
  {
    name: "Teknik Informatika",
    matkul: [
      {
        name: "Kalkulus",
        val: 5,
        duration: 5,
      },
      {
        name: "Perkenalan Teknologi Internet",
        val: 3,
        duration: 3,
      },
      {
        name: "Algoritma Struktur Data",
        val: 3,
        duration: 3,
      },
    ],
  },
  {
    name: "Teknik Elektro",
    matkul: [
      {
        name: "Matematika Teknik",
        val: 4,
        duration: 4,
      },
      {
        name: "Fisika Elektro",
        val: 4,
        duration: 4,
      },
      {
        name: "Probabilitas dan Statistika",
        val: 4,
        duration: 4,
      },
    ],
  },
  {
    name: "Teknik Kimia",
    matkul: [
      {
        name: "Kimia Analisis",
        val: 4,
        duration: 4,
      },
      {
        name: "Kimia Anorganik",
        val: 3,
        duration: 3,
      },
      {
        name: "Matematika I",
        val: 4,
        duration: 4,
      },
    ],
  },
  {
    name: "Ilmu Komunikasi",
    matkul: [
      {
        name: "Pengantar Ilmu Komunikasi",
        val: 4,
        duration: 4,
      },
      {
        name: "Pengantar Periklanan",
        val: 3,
        duration: 3,
      },
      {
        name: "Pengantar Public Relations",
        val: 4,
        duration: 4,
      },
    ],
  },
];
