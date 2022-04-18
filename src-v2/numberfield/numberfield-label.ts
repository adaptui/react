import { mergeProps } from "@react-aria/utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { NumberFieldState } from "./numberfield-state";

export const useNumberFieldLabel = createHook<NumberFieldLabelOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.labelProps, props);

    return props;
  },
);

export const NumberFieldLabel = createComponent<NumberFieldLabelOptions>(
  props => {
    const htmlProps = useNumberFieldLabel(props);

    return createElement("label", htmlProps);
  },
);

export type NumberFieldLabelOptions<T extends As = "label"> = Options<T> & {
  /**
   * Object returned by the `useNumberFieldState` hook.
   */
  state: NumberFieldState;
};

export type NumberFieldLabelProps<T extends As = "label"> = Props<
  NumberFieldLabelOptions<T>
>;
