import { useState, useEffect } from 'react';

type PlayerStatus = {
  name: string,
  val: number,
  rate: {
    growth: number,
    shrink: number,
  }
  isActive?: boolean,
}
export const useStatus = (input: PlayerStatus): [PlayerStatus, () => void, (growth: number, shrink: number) => void] => {
  const [status, setStatus] = useState<PlayerStatus>({
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

  const toggleActive = () => {
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

  return [status, toggleActive, setRate];
};
