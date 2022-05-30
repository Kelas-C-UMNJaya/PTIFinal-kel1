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
import { useState } from "react";

import { ComponentProps } from "@/lib/@types";

interface ButtonProps extends ComponentProps {
  onClick: () => void
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
  const [move, setMove] = useState(0);
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed top-0 right-0 p-5">
        <AboutButton onClick={() => console.log("Aul suka titid gede")}/> {/* TODO: kasih Modal */}

      </div>
      <h1 className="text-center text-red-600">
        Halo semua, Aul suka yg pas ditangan
      </h1>
      <h1 className="text-center mt-9 text-4xl md:text-6xl">
        Choose Your Character
      </h1>
        <div>
          { move == 0 ? <AvatarSelect onClick={() => setMove(1)} />
          : <LoginPage2 />}
        </div>
      </div>
  );
};

const LoginPage2 = () => {
  return (
    <div className="md:flex flex-row justify-center mt-14 mx-14">
      <img src={avatar[0]} className="object-contain h-96 w-96" />
      <div className="">
        <input type="name" name="nama" className="mt-5 px-3 py-2 
          bg-white border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
          w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Nama"/>
        <div className="flex flex-row my-4">
              <select className="form-select block
                md:w-80 w-full px-3 py-1.5
                text-base font-normal text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded transition ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-sky-500 focus:outline-none"
                aria-label="Default select example" defaultValue="Jurusan">
                <option value="Jurusan" disabled>Jurusan</option>
                <option value="Informatika">Informatitid</option>
                <option value="Ilmu Komunikasi">Ilmu Komunikatid</option>
                <option value="Sistem Informatika">Sistem Informatid</option>
              </select>
          </div>
        <Button>Start</Button>
      </div>
    </div>
  );
};

const AvatarSelect = ({onClick}: ComponentProps) => {
  return (
      <div className="container mx-auto space-y-2 place-content-center grid grid-cols-2 md:grid-rows-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4 mt-24">
        {avatar.map((img, idx) => {
          return (
            <div key={idx} className=" lg:w-full md:w-1/2 rounded hover:shadow-2xl" onClick={onClick}>
              <img
                src={img}
                className="object-contain lg:h-96 lg:w-96"
                alt="image"
              />
            </div>
          );
        })}
      </div>
  );
};
