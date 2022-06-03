import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import {ProgressBar, ProgressGroup, Button} from "@/components";
import { useNavigate } from "react-router-dom"
import { useStorage } from "@/lib/useStorage";
export const GameOver = () => {
  const navigate = useNavigate()
  const storage = useStorage()
  function handleHome() {
    navigate('/');
    storage.reset();
  }
  function handleRestart() {
    navigate('avatar');
    storage.reset();
  }
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className="flex h-screen bg-slate-800 justify-center items-center"
    >
      <div className="flex flex-col items-center gap-3 justify-center bg-gray-700 rounded-lg p-12">
        <h1 className="text-2xl font-bold text-white">Game Over</h1>
        <Icon icon="foundation:skull" className="text-5xl text-white" />
        <h1 className="text-white">Game selesai, titid mu sudah <span className="text-red-500">mengecil</span></h1>
        <div className="flex flex-col rounded-lg gap-3">
          <ProgressGroup className="grow md:w-[600px] w-60">
          <ProgressBar value={50} icon="dashicons:book"></ProgressBar>
          <ProgressBar value={50} icon="fa-solid:bed"></ProgressBar>
          <ProgressBar value={50} icon="ion:fast-food"></ProgressBar>
          <ProgressBar value={50} icon="fa:gamepad"></ProgressBar>
          </ProgressGroup>
          <div className="flex md:flex-row flex-col justify-between gap-2">
            <Button onClick={handleHome} color="bg-blue-500 hover:bg-blue-400" className="grow">Home</Button>
            <Button onClick={handleRestart} color="bg-emerald-500 hover:bg-emerald-400" className="grow">Restart</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
