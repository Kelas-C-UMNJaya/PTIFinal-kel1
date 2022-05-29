import { Player, PlayerContext } from "./@types";
import { useState, createContext, useContext } from "react";
import { useStatus } from "./useStatus";
import { ProviderProps } from "./@types";

export const UserContext = createContext<PlayerContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: ProviderProps) => {
  const [data, setData] = useState({
    name: "Agus",
    major: "Teknik Informatika",
  });

  const user = {
    name: data.name,
    major: data.major,
    status: {
      belajar: useStatus({
        name: "belajar",
        val: 0,
        rate: { growth: 1, shrink: 0 },
        isActive: false,
      }),
      makan: useStatus({
        name: "makan",
        val: 50,
        rate: { growth: 0.5, shrink: 0.3 },
        isActive: false,
      }),
      tidur: useStatus({
        name: "tidur",
        val: 50,
        rate: { growth: 1, shrink: 0.1 },
        isActive: false,
      }),
      main: useStatus({
        name: "main",
        val: 50,
        rate: { growth: 5, shrink: 2 },
        isActive: false,
      }),
    },
  };

  const updateStatus = () => {
    let status: keyof Player["status"];
    for (status in user.status) {
      user.status[status].update();
    }
  };

  const toggleStatus = (val: keyof Player["status"] | void) => {
    let status: keyof Player["status"];
    for (status in user.status) {
      user.status[status].toggle(false);
    }
    if (val) {
      user.status[val].stat.isActive
        ? user.status[val].toggle(false)
        : user.status[val].toggle(true);
    }
  };

  const changeData = (name: string, major: string) => {
    setData({
      name: name,
      major: major,
    });
  };

  return (
    <UserContext.Provider
      value={{ user, updateStatus, toggleStatus, changeData }}
    >
      {children}
    </UserContext.Provider>
  );
};
