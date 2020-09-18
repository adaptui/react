import { createHook, createComponent } from "reakit-system";
import { createOnKeyDown } from "reakit-utils";
import {
  unstable_GridHTMLProps as GridHTMLProps,
  unstable_GridRowProps as GridRowProps,
  unstable_useGrid as useGrid,
} from "reakit";

import { CALENDER_KEYS } from "./__keys";
import { CalenderStateReturn } from "./CalenderState";

export type CalenderBodyOptions = GridRowProps &
  Pick<
    CalenderStateReturn,
    "nextMonth" | "previousMonth" | "nextYear" | "previousYear"
  >;

export type CalenderBodyHTMLProps = GridHTMLProps;

export type CalenderBodyProps = CalenderBodyOptions & CalenderBodyHTMLProps;

export const useCalenderBody = createHook<
  CalenderBodyOptions,
  CalenderBodyHTMLProps
>({
  name: "CalenderBody",
  compose: useGrid,
  keys: CALENDER_KEYS,
  useProps(
    { nextMonth, previousMonth, nextYear, previousYear },
    { ...htmlProps },
  ) {
    const keyboardHandle = createOnKeyDown({
      keyMap: event => {
        const shift = event.shiftKey;
        return {
          PageUp: () => {
            shift ? nextYear() : nextMonth();
          },
          PageDown: () => {
            shift ? previousYear() : previousMonth();
          },
        };
      },
    });

    return {
      onKeyUp: keyboardHandle,
      ...htmlProps,
    };
  },
});

export const CalenderBody = createComponent({
  as: "table",
  useHook: useCalenderBody,
});
