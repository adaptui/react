import { createHook, createComponent } from "reakit-system";
import { createOnKeyDown } from "reakit-utils";
import {
  CompositeOptions,
  unstable_GridHTMLProps as GridHTMLProps,
  unstable_GridRowProps as GridRowProps,
  unstable_useGrid as useGrid,
} from "reakit";

import { CALENDER_KEYS } from "./__keys";
import { CalenderStateReturn } from "./CalenderState";

export type CalenderBodyOptions = CompositeOptions &
  GridRowProps &
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

  useComposeProps(options, htmlProps) {
    htmlProps = useGrid(options, htmlProps, true);

    const keyboardHandle = createOnKeyDown({
      onKeyDown: htmlProps.onKeyDown,
      keyMap: event => {
        const shift = event.shiftKey;
        return {
          PageUp: () => {
            shift ? options.nextYear() : options.nextMonth();
          },
          PageDown: () => {
            shift ? options.previousYear() : options.previousMonth();
          },
        };
      },
    });

    return {
      ...htmlProps,
      onKeyDown: keyboardHandle,
    };
  },
});

export const CalenderBody = createComponent({
  as: "table",
  useHook: useCalenderBody,
});
