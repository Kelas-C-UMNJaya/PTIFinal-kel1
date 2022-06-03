import {
  TopBar,
  GreetingsBar,
  ProgressBar,
  ProgressGroup,
  Button,
  ButtonGroup,
} from "@/components";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { avatar } from "@/assets/avatar";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ComponentProps } from "@/lib/@types";

import { useUser } from "@/lib/UserContext";
import { jurusan as JurusanData } from "@/data/Jurusan";
import { useStorage } from "@/lib/useStorage";
import { useGameData } from "@/lib/GameContext";
import { Location as LocationData } from "@/data/Location";

import umnBg from "@/assets/background/umn-pagi.jpg";

interface ButtonProps extends ComponentProps {
  onClick: () => void;
}

export const LoginPage = () => {
  const { user, changeData } = useUser();
  const [move, setMove] = useState(0);
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className="flex h-screen flex-col justify-center items-center backdrop-blur-sm bg-cover"
      style={{ backgroundImage: `url(${umnBg})` }}
    >
      {move == 0 ? (
        <AvatarSelect
          onClick={(img) => {
            setMove(1);
            changeData({ avatar: img });
          }}
        />
      ) : (
        <InputBioPage avatarImg={user.avatar} onBack={() => setMove(0)} />
      )}
    </motion.div>
  );
};

const InputBioPage = ({
  avatarImg,
  onBack,
}: {
  avatarImg: string;
  onBack: () => void;
}) => {
  const { changeData, resetUser } = useUser();
  const name = useRef<HTMLInputElement>(null);
  const jurusan = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  const { gameClock, setLocation } = useGameData();
  const storage = useStorage();
  const handleSubmit = () => {
    if (
      !(
        name.current?.value &&
        jurusan.current?.value &&
        jurusan.current.value !== "Jurusan"
      )
    ) {
      console.error("Data tidak boleh kosong!");
      return;
    }

    changeData({
      name: name.current?.value,
      major: JurusanData.find((val) => val.name === jurusan.current?.value),
    });
    gameClock.reset();
    resetUser();
    storage.reset();
    setLocation(LocationData[0]);
    navigate("/game");
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ delay: 0.1, type: "easeInOut", duration: 0.1 }}
      className="flex flex-col md:flex-row justify-center items-center bg-slate-700 p-6 md:p-12 rounded-lg gap-5"
    >
      <div className="max-h-[300px] max-w-[300px]">
        <img src={avatarImg} className="object-contain w-full h-full" />
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl text-center text-white">Insert your name</h3>
        <input
          type="name"
          name="nama"
          ref={name}
          className="px-3 py-2 
          bg-white border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
          w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Nama"
        />

        <select
          ref={jurusan}
          className="form-select block
            md:w-80 w-full px-3 py-1.5
            text-base font-normal text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded transition ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-sky-500 focus:outline-none"
          aria-label="Default select example"
          defaultValue="Jurusan"
        >
          <option value="Jurusan" disabled>
            Jurusan
          </option>
          {JurusanData.map((val: any, idx: number) => {
            return (
              <option key={idx} value={val.name}>
                {val.name}
              </option>
            );
          })}
        </select>
        <div className="flex flex-row gap-5 justify-between">
          <Button onClick={onBack} color="bg-orange-700 hover:bg-orange-600">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            color="bg-green-600 hover:bg-green-500"
          >
            Start
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const AvatarSelect = ({ onClick }: { onClick: (img: string) => void }) => {
  return (
    <div className="container flex flex-col mx-auto gap-6 md:gap-12 items-center justify-center bg-slate-700 p-5 rounded-lg">
      <h1 className="text-4xl md:text-5xl text-white">Pilih Avatar</h1>

      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 gap-6 lg:grid-cols-4 ">
        {avatar.map((img, idx) => {
          return (
            <div
              key={idx}
              className="bg-white rounded hover:shadow-2xl p-3 transform transition duration-100 hover:scale-110"
              onClick={() => {
                onClick(img);
              }}
            >
              <img src={img} className="object-contain" alt="image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
