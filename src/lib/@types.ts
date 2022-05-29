import { Duration } from "date-fns";

export type GameContextType = {
  location: string; // TODO Ganti i guess?
  time: Date;
  updateTime: () => void
};

export type ProviderProps = {
  children: React.ReactNode;
};

export type PlayerStatus = {
  name: string;
  val: number;
  rate: {
    growth: number;
    shrink: number;
  };
  isActive: boolean;
};
export type StatusReturn = {
  status: PlayerStatus;
  update: () => void;
  toggle: (val: boolean) => void;
  setRate: (growth: number, shrink: number) => void;
};
  
export interface Player {
  name: string;
  major: string;
  status: {
    belajar: StatusReturn;
    makan: StatusReturn;
    tidur: StatusReturn;
    main: StatusReturn;
  };
}
export interface PlayerContext {
  user: Player;
  updateStatus: () => void;
  toggleStatus: (val: keyof Player["status"]) => void;
  changeData: (name: string, major: string) => void;
}
  