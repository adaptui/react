import { isSameDay } from "date-fns";
import { useEffect, useRef } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import { ensureFocus, useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { CALENDAR_CELL_BUTTON_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export type CalendarCellButtonOptions = ButtonOptions &
  CalendarStateReturn & {
    weekIndex: number;
    dayIndex: number;
  };

export type CalendarCellButtonHTMLProps = ButtonHTMLProps;

export type CalendarCellButtonProps = CalendarCellButtonOptions &
  CalendarCellButtonHTMLProps;

export const useCalendarCellButton = createHook<
  CalendarCellButtonOptions,
  CalendarCellButtonHTMLProps
>({
  name: "CalendarCellButton",
  compose: useButton,
  keys: CALENDAR_CELL_BUTTON_KEYS,

  useOptions(options, { disabled }) {
    const { weekIndex, dayIndex, getCellOptions } = options;
    const { isDisabled } = getCellOptions(weekIndex, dayIndex);
    const truelyDisabled = disabled || isDisabled;

    return { disabled: truelyDisabled, ...options };
  },

  useProps(
    options,
    { onFocus: htmlOnFocus, onClick: htmlOnClick, ref: htmlRef, ...htmlProps },
  ) {
    const {
      disabled,
      weekIndex,
      dayIndex,
      getCellOptions,
      focusedDate,
      setFocusedDate,
      selectDate,
    } = options;

    const { cellDate, isFocused, isToday, isSelected } = getCellOptions(
      weekIndex,
      dayIndex,
    );

    const ref = useRef<HTMLElement>(null);

    // Focus the button in the DOM when the state updates.
    useEffect(() => {
      if (isFocused && ref.current) {
        ensureFocus(ref.current);
      }
    }, [cellDate, focusedDate, isFocused, ref]);

    const onClick = () => {
      if (!disabled) {
        selectDate(cellDate);
        setFocusedDate(cellDate);
      }
    };

    const onFocus = () => {
      if (!disabled) {
        setFocusedDate(cellDate);
      }
    };

    let tabIndex = undefined;
    if (!disabled) {
      tabIndex = isSameDay(cellDate, focusedDate) ? 0 : -1;
    }

    const dateFormatter = useDateFormatter({
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // aria-label should be localize Day of week, Month, Day and Year without Time.
    let label = dateFormatter.format(cellDate);
    if (isToday) {
      // If date is today, set appropriate string depending on selected state:
      label = isSelected ? `Today, ${label} selected` : `Today, ${label}`;
    } else if (isSelected) {
      // If date is selected but not today:
      label = `${label} selected`;
    }

    return {
      children: useDateFormatter({ day: "numeric" }).format(cellDate),
      tabIndex,
      "aria-label": label,
      "aria-disabled": ariaAttr(disabled),
      ref: useForkRef(ref, htmlRef),
      onClick: callAllHandlers(onClick, htmlOnClick),
      onFocus: callAllHandlers(onFocus, htmlOnFocus),
      ...htmlProps,
    };
  },
});

export const CalendarCellButton = createComponent({
  as: "span",
  memo: true,
  useHook: useCalendarCellButton,
});
