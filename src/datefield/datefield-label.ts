import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DateFieldState } from "./datefield-state";

export const useDateFieldLabel = createHook<DateFieldLabelOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.labelProps, props);

    return props;
  },
);

export const DateFieldLabel = createComponent<DateFieldLabelOptions>(props => {
  const htmlProps = useDateFieldLabel(props);

  return createElement("span", htmlProps);
});

export type DateFieldLabelOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useDateFieldState` hook.
   */
  state: DateFieldState;
};

export type DateFieldLabelProps<T extends As = "span"> = Props<
  DateFieldLabelOptions<T>
>;
