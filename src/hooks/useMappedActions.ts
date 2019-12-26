import { useCallback } from "react";
import { mapValues } from "lodash";
import { useDispatch } from 'react-redux';

export function useMappedActions<T>(actionsObj: T): T {
  const dispatch = useDispatch();
  // @ts-ignore
  return mapValues(actionsObj, value => {
    // @ts-ignore
    return useCallback((...args) => dispatch(value(...args)), []);
  });
}
