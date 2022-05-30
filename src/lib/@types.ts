import { Duration } from "date-fns";

export type GameContextType = {
  location: LocationType | null; 
  time: Date;
  updateTime: () => void
};

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

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
  state: PlayerStatus;
  dispatch: React.Dispatch<ReducerReturn>;
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
  status: {
    name: keyof Player["status"]; 
    growth?: number;
    shrink?: number;
  };
}

export interface LocationType {
  name: string;
  bgImg: string;
  actions: LocationActionType[] 
}
  
export type ReducerReturn = {
  type: "update";
} | {
  type: "setRate";
  payload: {
    growth: number;
    shrink: number;
  };
} | {
  type: "resetRate";
} | {
  type: "setActive";
  payload: boolean;
};
  