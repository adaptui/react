import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { TimeFieldState } from "./timefield-state";

export const useTimeFieldDescription = createHook<TimeFieldDescriptionOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.descriptionProps, props);

    return props;
  },
);

export const TimeFieldDescription =
  createComponent<TimeFieldDescriptionOptions>(props => {
    const htmlProps = useTimeFieldDescription(props);

    return createElement("span", htmlProps);
  });

export type TimeFieldDescriptionOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useTimeFieldState` hook.
   */
  state: TimeFieldState;
};

export type TimeFieldDescriptionProps<T extends As = "span"> = Props<
  TimeFieldDescriptionOptions<T>
>;
