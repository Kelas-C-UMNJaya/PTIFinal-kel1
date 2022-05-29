import { useState } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: string;
  active?: Boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  active = false,
}) => {
  return (
    <button
      className={`min-w-[150px] px-3 py-2 rounded-lg text-white transition ${
        active
          ? "bg-sky-500 hover:bg-sky-400"
          : "bg-slate-500 hover:bg-slate-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
