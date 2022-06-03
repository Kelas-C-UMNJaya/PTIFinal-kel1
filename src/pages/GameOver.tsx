import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import {ProgressBar, ProgressGroup, Button} from "@/components";
export const GameOver = () => {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className="flex h-screen bg-slate-800 justify-center items-center"
    >
      <div className="flex flex-col items-center gap-3 justify-center bg-gray-700 rounded-lg lg:w-9/12 lg:h-96">
        <h1 className="text-2xl font-bold text-white">Game Over</h1>
        <Icon icon="foundation:skull" className="text-5xl text-white" />
        <h1 className="text-white">Game selesai, titid mu sudah <span className="text-red-500">mengecil</span></h1>
        <div className="flex flex-col rounded-lg gap-3">
          <ProgressGroup className="grow">
          <ProgressBar value={50} icon="dashicons:book"></ProgressBar>
          <ProgressBar value={50} icon="fa-solid:bed"></ProgressBar>
          <ProgressBar value={50} icon="ion:fast-food"></ProgressBar>
          <ProgressBar value={50} icon="fa:gamepad"></ProgressBar>
          </ProgressGroup>
          <div className="flex gap-2">
            <Button>Home</Button>
            <Button>Restart</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
