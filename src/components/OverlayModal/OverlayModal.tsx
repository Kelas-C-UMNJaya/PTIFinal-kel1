import { ComponentProps } from "@/lib/@types";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps extends ComponentProps {
  title: string;
  onClose: () => void;
  disableFloat?: boolean;
  manualHeight?: boolean;
}

export const OverlayModal = ({
  title,
  onClose,
  children,
  className,
  disableFloat,
  manualHeight = false,
}: ModalProps) => {
  return (
    <motion.div
      layout
      key="modal"
      initial={{ x: "150%" }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "150%",
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className={`flex flex-col gap-3 rounded-lg p-5 z-50 transition-opacity duration-300 ease-in-out bg-slate-800 text-white 
      ${disableFloat ? "inset-0 absolute lg:relative m-5 lg:m-0 " : "inset-0 absolute"} 
      ${manualHeight ? "" : "lg:h-0 lg:min-h-full"}
      ${className}`
    }
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <Button className="min-w-0" onClick={onClose}>
          Close
        </Button>
      </div>
      {children}
    </motion.div>
  );
};
