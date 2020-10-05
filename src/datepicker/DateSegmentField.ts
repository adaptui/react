import { createOnKeyDown } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";

import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DateSegmentFieldOptions = CompositeOptions &
  Pick<DatePickerStateReturn, "next" | "previous" | "show">;

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

  useComposeProps(options, htmlProps) {
    const composite = useComposite(options, htmlProps);
    const onKeyDown = createOnKeyDown({
      onKey: composite.onKeyDown,
      preventDefault: false,
      keyMap: event => {
        const isShift = event.shiftKey;
        const isAlt = event.altKey;
        return {
          Tab: () => {
            isShift ? options.previous() : options.next();
          },
          ArrowDown: () => {
            isAlt && options.show();
          },
        };
      },
    });
    return { ...composite, onKeyDown, ...htmlProps };
  },
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
