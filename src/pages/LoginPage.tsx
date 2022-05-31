import {
  TopBar,
  GreetingsBar,
  ProgressBar,
  ProgressGroup,
  Button,
  ButtonGroup,
} from "@/components";
import { Icon } from "@iconify/react";

import { avatar } from "@/assets/avatar";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ComponentProps } from "@/lib/@types";

import { useUser } from "@/lib/UserContext";
import { jurusan as JurusanData } from "@/data/Jurusan";

import umnBg from "@/assets/background/umn.jpg";

interface ButtonProps extends ComponentProps {
  onClick: () => void;
}

const AboutButton = ({ onClick, ...props }: ButtonProps) => (
  <div
    onClick={onClick}
    className="flex justify-center rounded-full bg-slate-600 cursor-pointer text-3xl transition hover:text-sky-200 text-white p-2"
  >
    <Icon icon="eva:question-mark-outline" />
  </div>
);

export const LoginPage = () => {
  const { user, changeData } = useUser();
  const [move, setMove] = useState(0);
  return (
    <div
      className="flex h-screen flex-col justify-center items-center backdrop-blur-sm bg-cover"
      style={{ backgroundImage: `url(${umnBg})` }}
    >
      <div className="fixed top-0 right-0 p-5">
        <AboutButton onClick={() => console.log("Aul suka titid gede")} />{" "}
        {/* TODO: kasih Modal */}
      </div>
      <h1 className="text-center text-red-600">
        Halo semua, Aul suka yg pas ditangan
      </h1>
      {move == 0 ? (
        <AvatarSelect
          onClick={(img) => {
            setMove(1);
            changeData({ avatar: img });
          }}
        />
      ) : (
        <LoginPage2 avatarImg={user.avatar} onBack={() => setMove(0)} />
      )}
    </div>
  );
};

const LoginPage2 = ({
  avatarImg,
  onBack,
}: {
  avatarImg: string;
  onBack: () => void;
}) => {
  const { user, changeData } = useUser();
  const name = useRef<HTMLInputElement>(null);
  const jurusan = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
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
    navigate("/game");
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center my-14 bg-white p-12 rounded-lg gap-5">
      <img src={avatarImg} className="object-contain h-96 w-96" />
      <div className="flex flex-col gap-5">
        <input
          type="name"
          name="nama"
          ref={name}
          className="mt-5 px-3 py-2 
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
          ;
          {/* <option value="Informatika">Informatitid</option>
            <option value="Ilmu Komunikasi">Ilmu Komunikatid</option>
            <option value="Sistem Informatika">Sistem Informatid</option> */}
        </select>
        <div className="flex flex-row gap-5 justify-between">
          <Button onClick={handleSubmit}>Start</Button>
          <Button onClick={onBack}>Back</Button>
        </div>
      </div>
    </div>
  );
};

const AvatarSelect = ({ onClick }: { onClick: (img: string) => void }) => {
  return (
    <div className="container flex flex-col mx-auto gap-12 items-center justify-center bg-white p-12 rounded-lg">
      <h1 className="text-2xl md:text-5xl">Pilih Avatar</h1>

      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 gap-6 lg:grid-cols-4">
        {avatar.map((img, idx) => {
          return (
            <div
              key={idx}
              className=" lg:w-full md:w-1/2 rounded hover:shadow-2xl"
              onClick={() => {
                onClick(img);
              }}
            >
              <img
                src={img}
                className="object-contain lg:h-96 lg:w-96"
                alt="image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
