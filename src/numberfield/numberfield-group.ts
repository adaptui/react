import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { NumberFieldState } from "./numberfield-state";

export const useNumberFieldGroup = createHook<NumberFieldGroupOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.groupProps, props);

    return props;
  },
);

export const NumberFieldGroup = createComponent<NumberFieldGroupOptions>(
  props => {
    const htmlProps = useNumberFieldGroup(props);

    return createElement("div", htmlProps);
  },
);

export type NumberFieldGroupOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useNumberFieldState` hook.
   */
  state: NumberFieldState;
};

export type NumberFieldGroupProps<T extends As = "div"> = Props<
  NumberFieldGroupOptions<T>
>;
