/**
 * All credit goes to [Segun Adebayo](https://github.com/segunadebayo) for
 * creating an Awesome Library [Chakra UI](https://github.com/chakra-ui/chakra-ui/)
 * We improved the Progress Component [Progress](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/progress)
 * to work with Reakit System
 */
import { useWarning } from "reakit-warning";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createHook, createComponent, useCreateElement } from "reakit-system";

import { PROGRESS_KEYS } from "./__keys";
import { dataAttr, isNull } from "../utils";
import { ProgressStateReturn } from "./ProgressState";

export type ProgressOptions = RoleOptions &
  Pick<
    Partial<ProgressStateReturn>,
    "isIndeterminate" | "value" | "max" | "min"
  >;

export type ProgressHTMLProps = RoleHTMLProps;

export type ProgressProps = ProgressOptions & ProgressHTMLProps;

export const useProgress = createHook<ProgressOptions, ProgressHTMLProps>({
  name: "Progress",
  compose: useRole,
  keys: PROGRESS_KEYS,

  useProps(options, htmlProps) {
    const { isIndeterminate, value, max, min } = options;

    return {
      role: "progressbar",
      "data-indeterminate": dataAttr(isIndeterminate),
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": isNull(value) ? undefined : value,
      "aria-valuetext": !value?.toString() ? "intermediate" : value.toString(),
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
      "See https://www.w3.org/TR/wai-aria-1.2/#progressbar",
    );
    return useCreateElement(type, props, children);
  },
});
