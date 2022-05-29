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
      <h1 className="text-center text-red-600">Halo semua Aul suka yg pas ditangan</h1>
      <h1 className="text-center text-6xl">Choose Your Titit</h1>
      <div className="grow-1">
        <div className="flex flex-row">
          <img src={avatar} className="object-contain h-96 w-96"/>
          <div className="">
            <input type="name" name="nama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" placeholder="Nama"/>
            <div className="flex flex-row">
              <input type="name" name="nama" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" placeholder="Jurusan"/>
              <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button</button>
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
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