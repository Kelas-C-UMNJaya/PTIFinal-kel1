import { PlayerStatus, StatusReturn } from "./@types";
import { useState, useEffect } from "react";

export const useStatus = (input: PlayerStatus): StatusReturn => {
  const [status, setStatus] = useState({
    name: input.name,
    val: input.val,
    rate: input.rate,
    isActive: input.isActive,
  });

  function update() {
    setStatus((prevVal) => {
      return {
        ...prevVal,
        val: prevVal.isActive
          ? prevVal.val + prevVal.rate.growth
          : prevVal.val - prevVal.rate.shrink,
      };
    });
  }

  const toggle = (val: boolean) => {
    setStatus({
      ...status,
      isActive: val,
    });
    // console.log(`${status.name} is ${val}`);
  };

  const setRate = (growth: number, shrink: number) => {
    setStatus({
      ...status,
      rate: {
        growth: growth,
        shrink: shrink,
      },
    });
  };

  return { status, update, toggle, setRate };
};
