import { Duration } from "date-fns";

export type GameContextType = {
  location: LocationType | null; 
  time: Date;
  updateTime: () => void
};

export interface ProviderProps {
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
  toggleStatus: (val: keyof Player["status"] | void) => void;
  changeData: (name: string, major: string) => void;
}

export interface LocationActionType {
  name: string;
  affectStatus: {
    name: keyof Player["status"]; 
    growth?: number;
    shrink?: number;
  };
}

export interface LocationType {
  name: string;
  bgImg: string;
  actions: LocationActionType[] // TODO: Ganti ke typenya sendiri i guess? (agak redundan soalnya)
}
  