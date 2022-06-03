import { Button, ButtonGroup, OverlayModal } from "@/components";
import umnBg from "@/assets/background/umn-pagi.png";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export const Home = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      className="relative flex flex-col justify-center items-center h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${umnBg})`,
      }}
    >
      <div className="h-1/4 object-cover">
        <img src={`${logo}`} className="h-full" />
      </div>
      <ButtonGroup>
        <Link to="/avatar">
          <Button>Start</Button>
        </Link>
        <Link to="/game">
          <Button>Resume</Button>
        </Link>
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
    <OverlayModal title="About" onClose={setClose} className="m-5" manualHeight>
      <h1>Aul suka titid gede {">"}15cm</h1>
      <h3 className="text-2xl"> Credits </h3>
      <hr />
      <ol className="list-decimal pl-4">
        <li>
          <b>Rivo Juicer Wowor (00000059635)</b>
          <br />
          Lead Developer
        </li>
        <li>
          <b>Felix Rafael (00000060086)</b>
          <br />
          Game and Algorithm Designer
        </li>
        <li>
          <b>Fadhil Dzaky Muhammad (00000058398)</b>
          <br />
          Web Scripting and Javascript Developer
        </li>
        <li>
          <b>Auliyaa Vishwakarma Hestia (00000059515)</b>
          <br />
          Front-end Engineer and Designer
        </li>
      </ol>
    </OverlayModal>
  );
};
