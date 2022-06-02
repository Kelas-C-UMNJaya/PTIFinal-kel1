export type GameClockType = {
  time: Date;
  isActive: boolean;
  start: () => NodeJS.Timer;
  callback: () => void;
  stop: () => void;
  change: (hour: number) => void;
  changeVal: (date: Date) => void;
};

export type GameContextType = {
  location: LocationType;
  setLocation: React.Dispatch<LocationType>;
  gameClock: GameClockType;
};

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ProviderProps {
  children: React.ReactNode;
}

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

export interface PlayerBio {
  name: string;
  avatar: string;
  major: JurusanType;
}

export interface Player extends PlayerBio {
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
  changeData: ({
    name,
    major,
    avatar,
  }: {
    name?: string;
    major?: JurusanType;
    avatar?: string;
  }) => void;
}

export interface LocationActionType {
  name: string;
  status: {
    name: keyof Player["status"];
    growth?: number;
    shrink?: number;
    modal?: string;
  };
}

export interface LocationType {
  name: string;
  bgImg: string;
  time?: { start: number; end: number };
  actions: LocationActionType[];
}

export type ReducerReturn =
  | {
      type: "update";
    }
  | {
      type: "setRate";
      payload: {
        growth: number;
        shrink: number;
      };
    }
  | {
      type: "setVal";
      payload: number;
    }
  | {
      type: "resetRate";
    }
  | {
      type: "resetRate";
    }
  | {
      type: "setActive";
      payload: boolean;
    };

export interface MatkulType {
  name: string;
  val: number;
  duration: number;
}

export interface JurusanType {
  name: string;
  matkul: MatkulType[];
}

export type NewsType = {
  title: string;
  description: string;
  publishedAt: string;
  source: {
    name: string;
    id: string;
  };
};

export type WeatherType = {
  temp: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
};
