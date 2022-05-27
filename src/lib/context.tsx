import { useState, createContext } from 'react';
import { useStatus, StatusReturn as Status } from './customHook';

export interface PlayerContext {
  name: string,
  major: string,
  status: {
    belajar: Status,
    makan: Status,
    tidur: Status,
    main: Status,
  },
}


export const UserContext = createContext<PlayerContext | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode,
}

export const UserProvider = ({ children }: ProviderProps) => {
  const initialData: PlayerContext = {
    name: 'Agus',
    major: 'Teknik Informatika',
    status: {
      belajar: useStatus({ name: 'belajar', val: 0, rate: { growth: 1, shrink: 0 } }),
      makan: useStatus({ name: 'makan', val: 0, rate: { growth: 1, shrink: 0 } }),
      tidur: useStatus({ name: 'tidur', val: 0, rate: { growth: 1, shrink: 0 } }),
      main: useStatus({ name: 'main', val: 0, rate: { growth: 1, shrink: 0 } }),
    },
  }
  return (
    <UserContext.Provider value={initialData}>
      {children}
    </UserContext.Provider>
  );
}
