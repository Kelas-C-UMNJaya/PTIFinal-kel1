import { ReducerReturn } from "./@types";
import { PlayerStatus, StatusReturn } from "./@types";
import { useReducer } from "react";

export const useStatus = (input: PlayerStatus): StatusReturn => {
  const initRate = () => {
    return {
      growth: input.rate.growth,
      shrink: input.rate.shrink,
    };
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

      case "resetRate":
        return {
          ...state,
          rate: initRate(),
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, input);
  return { state, dispatch };
};
