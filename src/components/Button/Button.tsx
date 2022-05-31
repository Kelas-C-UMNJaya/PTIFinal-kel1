import { ComponentProps } from "@/lib/@types";
import { TailwindColorValue } from "tailwindcss/tailwind-config";

interface ButtonProps extends ComponentProps {
  onClick?: () => void;
  children: string | string[];
  active?: Boolean;
  color?: TailwindColorValue;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  className,
  active = false,
  color,
}) => {
  return (
    <button
      className={`${className} min-w-[150px] px-3 py-2 rounded-lg text-white transition ${
        !color
          ? active
            ? "bg-sky-500 hover:bg-sky-400"
            : "bg-slate-500 hover:bg-slate-400"
          : ""
      } ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
