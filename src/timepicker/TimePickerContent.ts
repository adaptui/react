import { createComponent, createHook } from "reakit-system";
import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";

import { TIME_PICKER_CONTENT_KEYS } from "./__keys";
import { TimePickerStateReturn } from "./TimePickerState";

export type TimePickerContentOptions = PopoverOptions &
  Pick<TimePickerStateReturn, "dialogId">;

export type TimePickerContentHTMLProps = PopoverHTMLProps;

export type TimePickerContentProps = TimePickerContentOptions &
  TimePickerContentHTMLProps;

export const useTimePickerContent = createHook<
  TimePickerContentOptions,
  TimePickerContentHTMLProps
>({
  name: "TimePickerContent",
  compose: usePopover,
  keys: TIME_PICKER_CONTENT_KEYS,

  useProps({ dialogId }, { onMouseDown: htmlOnMouseDown, ...htmlProps }) {
    return {
      id: dialogId,
      ...htmlProps,
    };
  },
});

export const TimePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerContent,
});
