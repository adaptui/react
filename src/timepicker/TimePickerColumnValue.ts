import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useButton,
  useCompositeItem,
} from "reakit";
import { useForkRef } from "reakit-utils";
import { callAllHandlers } from "@chakra-ui/utils";

import { TIME_PICKER_COLUMN_VALUE_KEYS } from "./__keys";
import { getSelectedValueFromDate } from "./helpers";
import { TimePickerColumnStateReturn } from "./TimePickerColumnState";

export type TimePickerColumnValueOptions = ButtonOptions &
  CompositeItemOptions &
  Pick<
    TimePickerColumnStateReturn,
    | "selected"
    | "move"
    | "setSelected"
    | "visible"
    | "restoreOldTime"
    | "updateOldTime"
    | "columnType"
    | "date"
    | "popover"
  > & {
    value: number;
  };

export type TimePickerColumnValueHTMLProps = ButtonHTMLProps &
  CompositeItemHTMLProps;

export type TimePickerColumnValueProps = TimePickerColumnValueOptions &
  TimePickerColumnValueHTMLProps;

export const useTimePickerColumnValue = createHook<
  TimePickerColumnValueOptions,
  TimePickerColumnValueHTMLProps
>({
  name: "TimePickerColumnValue",
  compose: [useButton, useCompositeItem],
  keys: TIME_PICKER_COLUMN_VALUE_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      ...htmlProps
    },
  ) {
    const {
      popover,
      setCurrentId,
      selected,
      value,
      id,
      setSelected,
      visible,
      date,
      updateOldTime,
      restoreOldTime,
      baseId,
      move,
      columnType,
    } = options;
    const ref = React.useRef<HTMLElement>();

    React.useEffect(() => {
      if (selected === value) {
        if (!id) return;

        setCurrentId?.(id);
        ref?.current?.scrollIntoView();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const handleCancellation = () => {
      const oldTime = restoreOldTime?.();
      if (!oldTime) return;
      if (oldTime.getTime() === date.getTime()) {
        popover?.hide();
      }

      const idx = getSelectedValueFromDate(oldTime, columnType);
      const id = idx + (columnType === "hour" ? 0 : 1);
      ref?.current?.scrollIntoView();

      move(`${baseId}-${id}`);
    };

    const handleSubmit = () => {
      setSelected(value, true);
      updateOldTime?.();
    };

    const onClick = React.useCallback(() => {
      setSelected(value);
    }, [setSelected, value]);

    const onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<any>) => {
        e.preventDefault();
        if (e.key === "Escape") {
          handleCancellation();
          return;
        }
        if (e.key === "Enter") {
          handleSubmit();
          return;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [restoreOldTime, updateOldTime, setSelected, value],
    );

    return {
      role: "option",
      "aria-selected": selected === value,
      ref: useForkRef(ref, htmlRef),
      onClick: callAllHandlers(htmlOnClick, onClick),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      ...htmlProps,
    };
  },
});

export const TimePickerColumnValue = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerColumnValue,
});
