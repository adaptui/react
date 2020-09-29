import React from "react";
import {
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
} from "reakit";
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { TimePickerColumnStateReturn } from "./TimePickerColumnState";

import { TIME_PICKER_COLUMN_VALUE_KEYS } from "./__keys";

export type TimePickerColumnValueOptions = CompositeItemOptions &
  Pick<TimePickerColumnStateReturn, "selected" | "move" | "onSelection"> & {
    value: number | string;
    visible?: boolean; // used to track mounting
  };

export type TimePickerColumnValueHTMLProps = CompositeItemHTMLProps;

export type TimePickerColumnValueProps = TimePickerColumnValueOptions &
  TimePickerColumnValueHTMLProps;

export const useTimePickerColumnValue = createHook<
  TimePickerColumnValueOptions,
  TimePickerColumnValueHTMLProps
>({
  name: "TimePickerColumnValue",
  compose: useCompositeItem,
  keys: TIME_PICKER_COLUMN_VALUE_KEYS,

  useProps(
    { setCurrentId, move, selected, value, id, onSelection },
    { ref, ...htmlProps },
  ) {
    const htmlRef = React.useRef();

    React.useEffect(() => {
      if (selected === value) {
        setCurrentId?.(id as string);
        move?.(id as string);
        (htmlRef?.current as any).scrollIntoView();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
      ref: useForkRef(ref, htmlRef),
      onKeyDown: e => {
        if (e.key === "Enter") {
          onSelection(value);
        }
      },
      "data-value": value,
      "data-selected": selected == value,
      ...htmlProps,
    };
  },
});

export const TimePickerColumnValue = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerColumnValue,
});
