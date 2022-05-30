import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { TimeFieldState } from "./timefield-state";

export const useTimeFieldLabel = createHook<TimeFieldLabelOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.labelProps, props);

    return props;
  },
);

export const TimeFieldLabel = createComponent<TimeFieldLabelOptions>(props => {
  const htmlProps = useTimeFieldLabel(props);

  return createElement("span", htmlProps);
});

export type TimeFieldLabelOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useTimeFieldState` hook.
   */
  state: TimeFieldState;
};

export type TimeFieldLabelProps<T extends As = "span"> = Props<
  TimeFieldLabelOptions<T>
>;
