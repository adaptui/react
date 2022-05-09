import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { ProgressState } from "./progress-state";

export const useProgress = createHook<ProgressOptions>(
  ({ state, ...props }) => {
    const { value, max, min, isIndeterminate } = state;

    props = {
      role: "progressbar",
      "data-indeterminate": isIndeterminate,
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": value == null ? undefined : value,
      "aria-valuetext": !value?.toString() ? "intermediate" : value.toString(),
      ...props,
    };

    return props;
  },
);

export const Progress = createComponent<ProgressOptions>(props => {
  const htmlProps = useProgress(props);

  return createElement("div", htmlProps);
});

export type ProgressOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useProgressState` hook.
   */
  state: ProgressState;
};

export type ProgressProps<T extends As = "div"> = Props<ProgressOptions<T>>;
