import { mergeProps } from "@react-aria/utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { DatePickerState } from "./datepicker-state";

export const useDatePickerLabel = createHook<DatePickerLabelOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.labelProps, props);

    return props;
  },
);

export const DatePickerLabel = createComponent<DatePickerLabelOptions>(
  props => {
    const htmlProps = useDatePickerLabel(props);

    return createElement("span", htmlProps);
  },
);

export type DatePickerLabelOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useDatePickerState` hook.
   */
  state: DatePickerState;
};

export type DatePickerLabelProps<T extends As = "span"> = Props<
  DatePickerLabelOptions<T>
>;
