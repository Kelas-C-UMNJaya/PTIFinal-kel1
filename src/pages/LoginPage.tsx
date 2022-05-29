import {
  TopBar,
  GreetingsBar,
  ProgressBar,
  ProgressGroup,
  Button,
  ButtonGroup,
} from "@/components";
import { Icon } from '@iconify/react';
import avatar from '@/assets/avatar/ava.jpg';

type ButtonProps = {
  onClick?: () => void;
};

const AboutButton = ({ onClick, ...props }: ButtonProps) => (
    <div
      onClick={onClick}
      className="flex justify-center rounded-full bg-slate-600 cursor-pointer text-3xl transition hover:text-sky-200 text-white p-2"
    >
      <Icon icon="eva:question-mark-outline" />
    </div>
  );

export const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed top-0 right-0 p-5">
        <AboutButton /> {/* TODO: kasih Modal */}
      </div>
      <h1 className="text-center text-red-600">Halo semua, Aul suka yg pas ditangan</h1>
      <h1 className="text-center text-6xl">Choose Your Titit</h1>
      <div className="">
        <div className="md:flex flex-row justify-center mt-14 mx-14">
          <img src={avatar} className="object-contain h-96 w-96"/>
          <div className="">
            <input type="name" name="nama" className="mt-5 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-80 rounded-md sm:text-sm focus:ring-1" placeholder="Nama"/>
            <div className="flex flex-row my-4">
              <input type="name" name="nama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" placeholder="Jurusan"/>
              <div className="dropdown inline-block relative m-1">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                  <span className="mr-1">Pilih</span>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                  <li className=""><a className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Informatitid</a></li>
                  <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Ilmu Komunikatid</a></li>
                  <li className=""><a className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Sitem Informatid</a></li>
                </ul>
              </div>
            </div>
            <Button>Start</Button>
          </div>
        </div>
      </div>
    </div>
  )
}