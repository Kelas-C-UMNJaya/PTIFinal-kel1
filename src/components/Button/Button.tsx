import { ComponentProps } from "@/lib/@types";
import { TailwindColorValue } from "tailwindcss/tailwind-config";
import { motion } from "framer-motion";

interface ButtonProps extends ComponentProps {
  onClick?: () => void;
  children: string | string[];
  active?: Boolean;
  color?: TailwindColorValue;
  disabled?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  className,
  active = false,
  disabled = false,
  color,
}) => {
  return (
    <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{scale: 0}}
        transition={{delay: 0.3, type: "easeInOut", duration: 0.1}}
      className={`${className} min-w-[150px] px-3 py-2 rounded-lg text-white transition ${
        !color
          ? active
            ? "bg-sky-500 hover:bg-sky-400"
            : disabled
            ? "bg-orange-800"
            : "bg-slate-500 hover:bg-slate-400 "
          : color
      } 
      ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
