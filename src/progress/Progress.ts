/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { isFunction } from "@chakra-ui/utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createHook, createComponent } from "reakit-system";

import { PROGRESS_KEYS } from "./__keys";
import { ProgressStateReturn } from "./ProgressState";

export type ProgressOptions = BoxOptions &
  Pick<
    ProgressStateReturn,
    "isIndeterminate" | "value" | "max" | "min" | "percent"
  > & {
    /**
     * Function that returns the `aria-valuetext` for screen readers.
     * It's mostly used to generate a more human-readable
     * representation of the value for assistive technologies
     */
    getAriaValueText?(value: number, percent: number): string;
  };

export type ProgressHTMLProps = BoxHTMLProps;

export type ProgressProps = ProgressOptions & ProgressHTMLProps;

const useProgress = createHook<ProgressOptions, ProgressHTMLProps>({
  name: "Progress",
  compose: useBox,
  keys: PROGRESS_KEYS,

  useProps(options, { "aria-valuetext": ariaValueText, ...htmlProps }) {
    const { isIndeterminate, value, max, min, percent } = options;

    return {
      ...htmlProps,
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

export const Progress = createComponent({
  as: "div",
  memo: true,
  useHook: useProgress,
});
