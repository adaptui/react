import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { MeterState } from "./meter-state";

export const useMeter = createHook<MeterOptions>(({ state, ...props }) => {
  const { value, max, min, percent } = state;

  props = {
    role: "meter progressbar",
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value,
    "aria-valuetext": !percent.toString() ? undefined : `${percent}%`,
    ...props,
  };

  return props;
});

export const Meter = createComponent<MeterOptions>(props => {
  const htmlProps = useMeter(props);

  return createElement("div", htmlProps);
});

export type MeterOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useMeterState` hook.
   */
  state: MeterState;
};

export type MeterProps<T extends As = "div"> = Props<MeterOptions<T>>;
