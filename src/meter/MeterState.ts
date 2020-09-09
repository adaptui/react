import {
  UseProgressProps,
  useProgressState,
  ProgressStateReturn,
} from "../progress";

export type UseMeterProps = UseProgressProps;
export const useMeterState = useProgressState;
export type MeterStateReturn = ProgressStateReturn;
