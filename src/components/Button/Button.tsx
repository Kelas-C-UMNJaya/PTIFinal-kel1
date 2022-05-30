import { ComponentProps } from "@/lib/@types";

interface ButtonProps extends ComponentProps {
  onClick?: () => void;
  children: string | string[];
  active?: Boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  className,
  active = false,
}) => {
  return (
    <button
      className={`${className} min-w-[150px] px-3 py-2 rounded-lg text-white transition ${
        active
          ? "bg-sky-500 hover:bg-sky-400"
          : "bg-slate-500 hover:bg-slate-400"
      } `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
