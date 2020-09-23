import { callAllHandlers } from "@chakra-ui/utils";
import {
  CompositeItemHTMLProps,
  CompositeItemOptions,
  CompositeProps,
  useCompositeItem,
} from "reakit";
import { createComponent, createHook } from "reakit-system";
import {
  NumberInputHTMLProps,
  NumberInputOptions,
  NumberInputProps,
  useNumberInput,
} from "../number-input";
import { isValidNumericKeyboardEvent } from "../number-input/__utils";
import { DatePickerStateReturn } from "./DatePickerState";

import { DATE_PICKER_SEGMENT_KEYS } from "./__keys";

export type DatePickerSegmentOptions = CompositeItemOptions &
  NumberInputOptions &
  Pick<DatePickerStateReturn, "numberSegmentStates"> & {
    type: "date" | "month" | "year";
  };

export type DatePickerSegmentHTMLProps = CompositeItemHTMLProps &
  NumberInputHTMLProps;

export type DatePickerSegmentProps = CompositeProps &
  NumberInputProps &
  DatePickerSegmentOptions &
  DatePickerSegmentHTMLProps;

export const useDatePickerSegment = createHook<
  DatePickerSegmentOptions,
  DatePickerSegmentHTMLProps
>({
  name: "DatePickerSegment",
  compose: [useCompositeItem],
  keys: DATE_PICKER_SEGMENT_KEYS,

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const compositeItem = useCompositeItem(options, htmlProps, true);

    const numberInputState = options.numberSegmentStates[options.type];
    const inputState = useNumberInput(numberInputState, htmlProps, true);

    const onKeyDown = (event: any) => {
      event.preventDefault();
      if (isValidNumericKeyboardEvent(event)) {
        // numberInputState.update(+event.key);
      }
    };

    return {
      ...compositeItem,
      ...inputState,
      onKeyUp: onKeyDown,
      children: inputState.value,
      ...htmlProps,
    };
  },
});

export const DatePickerSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegment,
});
