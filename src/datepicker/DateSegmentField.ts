import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { createOnKeyDown } from "reakit-utils";
import { DatePickerStateReturn } from "./DatePickerState";

import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";

export type DateSegmentFieldOptions = CompositeOptions &
  Pick<DatePickerStateReturn, "next" | "previous">;

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
        return {
          Tab: () => {
            isShift ? options.previous() : options.next();
          },
        };
      },
    });
    return { composite, onKeyDown, ...htmlProps };
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
