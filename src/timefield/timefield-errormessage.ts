import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { TimeFieldState } from "./timefield-state";

export const useTimeFieldErrorMessage =
  createHook<TimeFieldErrorMessageOptions>(({ state, ...props }) => {
    props = mergeProps(state.errorMessageProps, props);

    return props;
  });

export const TimeFieldErrorMessage =
  createComponent<TimeFieldErrorMessageOptions>(props => {
    const htmlProps = useTimeFieldErrorMessage(props);

    return createElement("span", htmlProps);
  });

export type TimeFieldErrorMessageOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useTimeFieldState` hook.
   */
  state: TimeFieldState;
};

export type TimeFieldErrorMessageProps<T extends As = "span"> = Props<
  TimeFieldErrorMessageOptions<T>
>;
