import { ComponentProps } from "@/lib/@types";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps extends ComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  disableFloat?: boolean;
}

export const OverlayModal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  disableFloat,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ x: "150%" }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "150%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className={`inset-0 absolute md:relative m-5 md:m-0 flex flex-col gap-3 rounded-lg p-5 z-50 transition-opacity duration-300 ease-in-out bg-slate-800 text-white h-0 min-h-full
      ${!disableFloat ? "inset-0 absolute" : ""} ${className}`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            <Button className="min-w-0" onClick={onClose}>
              Close
            </Button>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
