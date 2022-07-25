import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DateFieldState } from "./datefield-state";

export const useDateFieldDescription = createHook<DateFieldDescriptionOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.descriptionProps, props);

    return props;
  },
);

export const DateFieldDescription =
  createComponent<DateFieldDescriptionOptions>(props => {
    const htmlProps = useDateFieldDescription(props);

    return createElement("label", htmlProps);
  });

export type DateFieldDescriptionOptions<T extends As = "label"> = Options<T> & {
  /**
   * Object returned by the `useDateFieldState` hook.
   */
  state: DateFieldState;
};

export type DateFieldDescriptionProps<T extends As = "label"> = Props<
  DateFieldDescriptionOptions<T>
>;
