import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { TimeFieldState } from "./timefield-state";

export const useTimeField = createHook<TimeFieldOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.ref, props.ref) };
    props = mergeProps(state.fieldProps, props);

    return props;
  },
);

export const TimeField = createComponent<TimeFieldOptions>(props => {
  const htmlProps = useTimeField(props);

  return createElement("div", htmlProps);
});

export type TimeFieldOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useTimeFieldBaseState` hook.
   */
  state: TimeFieldState;
};

export type TimeFieldProps<T extends As = "div"> = Props<TimeFieldOptions<T>>;
