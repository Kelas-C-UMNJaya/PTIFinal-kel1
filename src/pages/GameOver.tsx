import { motion } from "framer-motion";
export const GameOver = () => {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
    >
      <p>Gamenya kelar</p>
    </motion.div>
  );
};
