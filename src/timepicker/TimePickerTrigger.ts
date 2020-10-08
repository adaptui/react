import {
  usePopoverDisclosure,
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
} from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";

import { TIME_PICKER_TRIGGER_KEYS } from "./__keys";
import { TimePickerStateReturn } from "./TimePickerState";

export type TimePickerTriggerOptions = PopoverDisclosureOptions &
  TimePickerStateReturn;

export type TimePickerTriggerHTMLProps = PopoverDisclosureHTMLProps;

export type TimePickerTriggerProps = TimePickerTriggerOptions &
  TimePickerTriggerHTMLProps;

export const useTimePickerTrigger = createHook<
  TimePickerTriggerOptions,
  TimePickerTriggerHTMLProps
>({
  name: "TimePickerTrigger",
  compose: usePopoverDisclosure,
  keys: TIME_PICKER_TRIGGER_KEYS,

  useProps(_, { onMouseDown: htmlOnMouseDown, ...htmlProps }) {
    const onMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return {
      tabIndex: -1,
      onMouseDown: callAllHandlers(htmlOnMouseDown, onMouseDown),
      ...htmlProps,
    };
  },
});

export const TimePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerTrigger,
});
