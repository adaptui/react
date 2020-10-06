import { createComponent, createHook } from "reakit-system";
import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";

import { callAllHandlers } from "@chakra-ui/utils";
import { DATE_PICKER_CONTENT_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerContentOptions = PopoverOptions &
  Pick<DatePickerStateReturn, "dialogId">;

export type DatePickerContentHTMLProps = PopoverHTMLProps;

export type DatePickerContentProps = DatePickerContentOptions &
  DatePickerContentHTMLProps;

export const useDatePickerContent = createHook<
  DatePickerContentOptions,
  DatePickerContentHTMLProps
>({
  name: "DatePickerContent",
  compose: usePopover,
  keys: DATE_PICKER_CONTENT_KEYS,

  useProps({ dialogId }, { onMouseDown: htmlOnMouseDown, ...htmlProps }) {
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return {
      id: dialogId,
      onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
      ...htmlProps,
    };
  },
});

export const DatePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerContent,
});
