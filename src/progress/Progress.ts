/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createHook, createComponent } from "reakit-system";

import { dataAttr } from "../utils";
import { PROGRESS_KEYS } from "./__keys";
import { ProgressStateReturn } from "./ProgressState";

export type ProgressOptions = BoxOptions &
  Pick<
    ProgressStateReturn,
    "isIndeterminate" | "value" | "max" | "min" | "ariaValueText"
  > & {};

export type ProgressHTMLProps = BoxHTMLProps;

export type ProgressProps = ProgressOptions & ProgressHTMLProps;

export const useProgress = createHook<ProgressOptions, ProgressHTMLProps>({
  name: "Progress",
  compose: useBox,
  keys: PROGRESS_KEYS,

  useProps(options, { "aria-valuetext": htmlAriaValueText, ...htmlProps }) {
    const { isIndeterminate, value, max, min, ariaValueText } = options;

    return {
      role: "progressbar",
      "data-indeterminate": dataAttr(isIndeterminate),
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": isIndeterminate ? undefined : value,
      "aria-valuetext":
        htmlAriaValueText ?? ariaValueText ? ariaValueText : `${value}`,
      ...htmlProps,
    };
  },
});

export const Progress = createComponent({
  as: "div",
  memo: true,
  useHook: useProgress,
});
