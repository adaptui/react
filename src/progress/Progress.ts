/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { useWarning } from "reakit-warning";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createHook, createComponent, useCreateElement } from "reakit-system";

import { PROGRESS_KEYS } from "./__keys";
import { dataAttr, isNull } from "../utils";
import { ProgressStateReturn } from "./ProgressState";

export type ProgressOptions = BoxOptions &
  Pick<
    ProgressStateReturn,
    "isIndeterminate" | "value" | "max" | "min" | "ariaValueText"
  >;

export type ProgressHTMLProps = BoxHTMLProps;

export type ProgressProps = ProgressOptions & ProgressHTMLProps;

export const useProgress = createHook<ProgressOptions, ProgressHTMLProps>({
  name: "Progress",
  compose: useBox,
  keys: PROGRESS_KEYS,

  useProps(options, htmlProps) {
    const { isIndeterminate, value, max, min, ariaValueText } = options;

    return {
      role: "progressbar",
      "data-indeterminate": dataAttr(isIndeterminate),
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": isNull(value) ? undefined : value,
      "aria-valuetext": `${ariaValueText}`,
      ...htmlProps,
    };
  },
});

export const Progress = createComponent({
  as: "div",
  memo: true,
  useHook: useProgress,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
    );
    return useCreateElement(type, props, children);
  },
});
