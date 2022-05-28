import { useState, createContext, useContext } from 'react';
import { useStatus, StatusReturn as Status } from './useStatus';

export interface Player {
  name: string,
  major: string,
  status: {
    belajar: Status,
    makan: Status,
    tidur: Status,
    main: Status,
  },
}

interface PlayerContext {
  user: Player,
  updateStatus: () => void
  toggleStatus: (val: keyof Player["status"]) => void,
  changeData: (name: string, major: string) => void,
}

export const UserContext = createContext<PlayerContext | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode,
}

// belajar.update();
// makan.update();
// tidur.update();
// main.update();

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const UserProvider = ({ children }: ProviderProps) => {

  const [data, setData] = useState({
    name: "Agus",
    major: "Teknik Informatika",
  })

  const user = {
    name: data.name,
    major: data.major,
    status: {
      belajar: useStatus({ name: 'belajar', val: 0, rate: { growth: 1, shrink: 0 }, isActive: false }),
      makan: useStatus({ name: 'makan', val: 0, rate: { growth: 1, shrink: 0 }, isActive: false }),
      tidur: useStatus({ name: 'tidur', val: 0, rate: { growth: 1, shrink: 0 }, isActive: false }),
      main: useStatus({ name: 'main', val: 0, rate: { growth: 1, shrink: 0 }, isActive: false }),
    },
  };

  const updateStatus = () => {
    let status: keyof Player["status"];
    for (status in user.status) {
      user.status[status].update();
    }
  };

  // const toggleStatus = (val: keyof Player["status"]) => {
  const toggleStatus = (val: keyof Player["status"]) => {
    let status: keyof Player["status"];
    for (status in user.status) {
      user.status[status].toggle(false);
    }
    user.status[val].status.isActive ? user.status[val].toggle(false) : user.status[val].toggle(true);
    console.log(`${val} is now ${user.status[val].status.isActive}`);
  };

  const changeData = (name: string, major: string) => {
    setData({
      name: name,
      major: major,
    });
  }

  return (
    <UserContext.Provider value={{ user, updateStatus, toggleStatus, changeData }}>
      {children}
    </UserContext.Provider>
  );
}
