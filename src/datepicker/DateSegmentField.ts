import { callAllHandlers } from "@chakra-ui/utils";
import { createOnKeyDown } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";

import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DateSegmentFieldOptions = CompositeOptions & DatePickerStateReturn;

export type DateSegmentFieldHTMLProps = CompositeHTMLProps;

export type DateSegmentFieldProps = DateSegmentFieldOptions &
  DateSegmentFieldHTMLProps;

export const useDateSegmentField = createHook<
  DateSegmentFieldOptions,
  DateSegmentFieldHTMLProps
>({
  name: "DateSegmentField",
  compose: useComposite,
  keys: DATE_SEGMENT_FIELD_KEYS,

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const { pickerId, previous, next, show } = options;

    const onKeyDown = createOnKeyDown({
      onKey: htmlOnKeyDown,
      preventDefault: false,
      keyMap: event => {
        const isShift = event.shiftKey;
        const isAlt = event.altKey;

        return {
          Tab: () => {
            isShift ? previous() : next();
          },
          ArrowDown: () => {
            isAlt && show();
          },
        };
      },
    });

    return {
      "aria-labelledby": pickerId,
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      ...htmlProps,
    };
  },
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
