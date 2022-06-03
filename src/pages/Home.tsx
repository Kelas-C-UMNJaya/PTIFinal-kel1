import { Button, ButtonGroup, OverlayModal } from "@/components";
import umnBg from "@/assets/background/umn-pagi.jpg";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import avatarCredit from "@/data/Credit";

export const Home = () => {
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("data")) {
      setUserExists(true);
    }
  }, []);
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className="relative flex flex-col justify-center items-center h-screen overflow-hidden bg-cover"
      style={{
        backgroundImage: `url(${umnBg})`,
      }}
    >
      <div className="h-1/4 object-cover">
        <img src={`${logo}`} className="h-full" />
      </div>
      <ButtonGroup>
        <Link to="/avatar">
          <Button>New Game</Button>
        </Link>
        <Button
          disabled={!userExists}
          onClick={() => (userExists ? navigate("/game") : null)}
        >
          Resume
        </Button>
        <Button onClick={() => setShowAbout(true)}>About</Button>
      </ButtonGroup>
      <AnimatePresence>
        {showAbout && (
          <AboutModal key="about-us" setClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutModal = ({ setClose }: { setClose: () => void }) => {
  return (
    <OverlayModal
      title="About"
      onClose={setClose}
      className="m-5 overflow-hidden"
      manualHeight
    >
      <div className="flex flex-col gap-5 h-0 min-h-full">
        <p className="text-sm md:text-md">
          7 Days Aul Simulator merupakan suatu permainan simulasi kehidupan
          kuliah dari seorang mahasiswa UMN selama 7 hari.
          <br /> Permainan ini dibuat untuk memenuhi ujian akhir mata kuliah
          Pengantar Teknologi Internet.
        </p>
        <iframe
          className="w-full h-48 md:w-[300px] md:h-[150px]"
          src="https://www.youtube.com/embed/SanFPxBdWNA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <h3 className="text-md md:text-2xl"> Kelompok 1</h3>
        <hr />
        <div className="flex md:flex-row flex-col mt-3 gap-4 overflow-y-auto flex-initial">
          {avatarCredit.map((val: any, idx: number) => {
            return (
              <div
                key={idx}
                className="flex flex-col items-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full p-5 gap-1"
              >
                <img src={val.avatar} className="md:w-full w-24 rounded-full" />
                <p className="text-center md:text-xl font-bold mt-3">
                  {val.name}
                </p>
                <p className="text-center md:text-sm italic">{val.nim}</p>
                <p className="text-center md:text-sm">{val.job}</p>
              </div>
            );
          })}
        </div>
      </div>
    </OverlayModal>
  );
};
