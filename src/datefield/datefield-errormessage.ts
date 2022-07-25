import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DateFieldState } from "./datefield-state";

export const useDateFieldErrorMessage =
  createHook<DateFieldErrorMessageOptions>(({ state, ...props }) => {
    props = mergeProps(state.errorMessageProps, props);

    return props;
  });

export const DateFieldErrorMessage =
  createComponent<DateFieldErrorMessageOptions>(props => {
    const htmlProps = useDateFieldErrorMessage(props);

    return createElement("label", htmlProps);
  });

export type DateFieldErrorMessageOptions<T extends As = "label"> =
  Options<T> & {
    /**
     * Object returned by the `useDateFieldState` hook.
     */
    state: DateFieldState;
  };

export type DateFieldErrorMessageProps<T extends As = "label"> = Props<
  DateFieldErrorMessageOptions<T>
>;
