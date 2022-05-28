import { Duration } from "date-fns";

export type GameContextType = {
  location: string; // TODO Ganti i guess?
  time: Date;
  updateTime: () => void
};

export type ProviderProps = {
  children: React.ReactNode;
};
