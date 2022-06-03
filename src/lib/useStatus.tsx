import { ReducerReturn } from "./@types";
import { PlayerStatus, StatusReturn } from "./@types";
import { useState, useReducer } from "react";

export const useStatus = (input: PlayerStatus): StatusReturn => {
  const initRate = () => {
    return {
      growth: input.rate.growth,
      shrink: input.rate.shrink,
    };
  };

  const initVal = () => {
    return input.val;
  };

  const reducer = (
    state: PlayerStatus,
    action: ReducerReturn
  ): PlayerStatus => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          val: state.isActive
            ? state.val + state.rate.growth < 100
              ? state.val + state.rate.growth
              : 100
            : state.val - state.rate.shrink > 0
            ? state.val - state.rate.shrink
            : 0,
        };

      case "setVal":
        return {
          ...state,
          val: action.payload,
        };

      case "setRate":
        return {
          ...state,
          rate: action.payload,
        };

      case "setActive":
        return {
          ...state,
          isActive: action.payload,
        };
      
      case "addTotal":
        return {
          ...state,
          total: state.total + action.payload,
        }

      case "resetRate":
        return {
          ...state,
          rate: initRate(),
        };

      case "resetVal":
        return {
          ...state,
          val: initVal(),
        };

      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, input);
  return { state, dispatch };
};
