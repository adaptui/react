import { createHook, createComponent } from "reakit-system";
import {
  unstable_GridHTMLProps as GridHTMLProps,
  unstable_GridRowProps as GridRowProps,
} from "reakit";

import { CALENDER_KEYS } from "./__keys";
import { CalenderStateReturn } from "./CalenderState";

export type CalenderOptions = GridRowProps &
  Pick<
    CalenderStateReturn,
    "nextMonth" | "previousMonth" | "nextYear" | "previousYear"
  >;

export type CalenderHTMLProps = GridHTMLProps;

export type CalenderProps = CalenderOptions & CalenderHTMLProps;

export const useCalender = createHook<CalenderOptions, CalenderHTMLProps>({
  name: "Calender",
  keys: CALENDER_KEYS,
  useProps(_, htmlProps) {
    return {
      ...htmlProps,
    };
  },
});

export const Calender = createComponent({
  as: "div",
  useHook: useCalender,
});
