import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode,
  className?: string,
}

export const ButtonGroup: React.FunctionComponent<Props> = ({ children, className, ...props }) => {
  return (
      <motion.div
      transition={{ ease: "easeOut", duration: 2 }}
        className={`p-4 bg-gray-800 rounded-lg flex flex-col flex-shrink gap-3 transition-all ${className}`} {...props}>
        {children}
      </motion.div>
  )
}