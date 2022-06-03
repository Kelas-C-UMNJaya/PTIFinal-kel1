import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ProgressBar, ProgressGroup, Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/UserContext";
import { useStorage } from "@/lib/useStorage";
import { useState, useEffect } from "react";

export const GameOver = () => {
  const navigate = useNavigate();
  const storage = useStorage();
  const { user } = useUser();

  const [total, setTotal] = useState({
    belajar: user.status.belajar.state.total / 6,
    makan: user.status.makan.state.total / 6,
    tidur: user.status.tidur.state.total / 6,
    main: user.status.main.state.total / 6,
  });

  const totalToMsg = (val:typeof total) => {
    if(val.belajar < 50) return "Kamu bodoh";
    if(val.makan < 50) return "Kamu busung lapar";
    if(val.tidur < 50) return "Kamu bisa narkolepsi";
    if(val.main < 50) return "Kamu kurang holywings";
  }

  function handleHome() {
    navigate("/");
    storage.reset();
  }
  function handleRestart() {
    navigate("/avatar");
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
        <h1 className="text-white">
          Game selesai, {totalToMsg(total)}
        </h1>
        <div className="flex flex-col rounded-lg gap-3">
          <ProgressGroup className="grow md:w-[600px] w-60">
            <ProgressBar
              value={total.belajar}
              icon="dashicons:book"
            ></ProgressBar>
            <ProgressBar value={total.tidur} icon="fa-solid:bed"></ProgressBar>
            <ProgressBar value={total.makan} icon="ion:fast-food"></ProgressBar>
            <ProgressBar value={total.main} icon="fa:gamepad"></ProgressBar>
          </ProgressGroup>
          <div className="flex md:flex-row flex-col justify-between gap-2">
            <Button
              onClick={handleHome}
              color="bg-blue-500 hover:bg-blue-400"
              className="grow"
            >
              Home
            </Button>
            <Button
              onClick={handleRestart}
              color="bg-emerald-500 hover:bg-emerald-400"
              className="grow"
            >
              Restart
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
