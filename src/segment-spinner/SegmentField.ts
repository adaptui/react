import { createOnKeyDown } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";

import { SEGMENT_FIELD_KEYS } from "./__keys";
import { SegmentStateReturn } from "./SegmentState";

export type SegmentFieldOptions = CompositeOptions &
  Pick<SegmentStateReturn, "next" | "previous">;

export type SegmentFieldHTMLProps = CompositeHTMLProps;

export type SegmentFieldProps = SegmentFieldOptions & SegmentFieldHTMLProps;

export const useSegmentField = createHook<
  SegmentFieldOptions,
  SegmentFieldHTMLProps
>({
  name: "SegmentField",
  compose: useComposite,
  keys: SEGMENT_FIELD_KEYS,

  useComposeProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const onKeyDown = createOnKeyDown({
      onKey: htmlOnKeyDown,
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

    return { ...htmlProps, onKeyDown };
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const SegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useSegmentField,
});
