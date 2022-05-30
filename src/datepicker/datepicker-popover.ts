import { usePopover } from "ariakit";
import { useEvent } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DatePickerState } from "./datepicker-state";
import { DateRangePickerState } from "./daterangepicker-state";

export const useDatePickerPopover = createHook<DatePickerPopoverOptions>(
  ({ state, ...props }) => {
    const onKeyDownProp = props.onKeyDown;

    const onKeyDown = useEvent((event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(event);

      if (event.key !== "Escape") return;
      state.baseState.popover.hide();

      if (event.defaultPrevented) return;
    });

    props = usePopover({
      ...props,
      state: state.baseState.popover,
      modal: true,
      autoFocusOnShow: false,
      backdropProps: { onKeyDown },
    });
    props = mergeProps(state.dialogProps, props);

    return props;
  },
);

export const DatePickerPopover = createComponent<DatePickerPopoverOptions>(
  props => {
    const htmlProps = useDatePickerPopover(props);

    return createElement("span", htmlProps);
  },
);

export type DatePickerPopoverOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useDatePickerState` hook.
   */
  state: DatePickerState | DateRangePickerState;
};

export type DatePickerPopoverProps<T extends As = "span"> = Props<
  DatePickerPopoverOptions<T>
>;
