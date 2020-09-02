import { BoxHTMLProps, useBox } from "reakit";
import { isFunction } from "@chakra-ui/utils";
import { createHook, createComponent } from "reakit-system";

import { PROGRESS_BAR_KEYS } from "./__keys";
import { useProgressReturn } from "./ProgressState";

export type useProgressBarOptions = useProgressReturn & {
  /**
   * Function that returns the `aria-valuetext` for screen readers.
   * It's mostly used to generate a more human-readable
   * representation of the value for assistive technologies
   */
  getAriaValueText?(value: number, percent: number): string;
};

const useProgressBar = createHook<useProgressBarOptions, BoxHTMLProps>({
  name: "ProgressBar",
  compose: useBox,
  keys: PROGRESS_BAR_KEYS,

  useProps(
    options,
    { style: htmlStyle, "aria-valuetext": ariaValueText, ...htmlProps },
  ) {
    const { isIndeterminate, value, max, min, percent } = options;

    return {
      ...htmlProps,
      style: {
        ...htmlStyle,
        width: percent != null ? `${percent}%` : undefined,
        height: "100%",
      },
      role: "progressbar",
      "data-indeterminate": isIndeterminate ? "" : undefined,
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": isIndeterminate ? undefined : value,
      "aria-valuetext":
        value == null || percent == null
          ? undefined
          : isFunction(options.getAriaValueText)
          ? options.getAriaValueText(value, percent)
          : ariaValueText,
    };
  },
});

export const ProgressBar = createComponent({
  as: "div",
  memo: true,
  useHook: useProgressBar,
});
