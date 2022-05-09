import { mergeProps } from "@react-aria/utils";
import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { DateFieldState } from "./datefield-state";

export const useDateField = createHook<DateFieldOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.ref, props.ref) };
    props = mergeProps(state.fieldProps, props);

    return props;
  },
);

export const DateField = createComponent<DateFieldOptions>(props => {
  const htmlProps = useDateField(props);

  return createElement("div", htmlProps);
});

export type DateFieldOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useDateFieldBaseState` hook.
   */
  state: DateFieldState;
};

export type DateFieldProps<T extends As = "div"> = Props<DateFieldOptions<T>>;
