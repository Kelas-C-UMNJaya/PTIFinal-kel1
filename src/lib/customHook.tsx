import { useState, useEffect } from 'react';

export type PlayerStatus = {
  name: string,
  val: number,
  rate: {
    growth: number,
    shrink: number,
  }
  isActive?: boolean,
}

export type StatusReturn = {
  status: PlayerStatus,
  toggle: () => void,
  setRate: (growth: number, shrink: number) => void,
}

export const useStatus = (input: PlayerStatus): StatusReturn => {
  const [status, setStatus] = useState({
    name: input.name,
    val: input.val,
    rate: input.rate,
    isActive: input.isActive || false,
  });

  function updateVal() {
    setStatus({
      ...status,
      val: status.isActive ? status.val + status.rate.growth : status.val - status.rate.shrink,
    });
  }

  const toggle = () => {
    setStatus({
      ...status,
      isActive: !status.isActive,
    });
  }

  useEffect(() => {
    const interval = setInterval(updateVal, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const setRate = (growth: number, shrink: number) => {
    setStatus({
      ...status,
      rate: {
        growth: growth,
        shrink: shrink,
      },
    });
  };

  return { status, toggle, setRate };
};
