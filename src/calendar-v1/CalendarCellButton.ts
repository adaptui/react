import * as React from "react";
import { isSameDay } from "date-fns";
import { ensureFocus, useForkRef } from "reakit-utils";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";
import { useDateFormatter } from "@react-aria/i18n";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { CalendarStateReturn } from "./CalendarState";
import { CALENDAR_CELL_BUTTON_KEYS } from "./__keys";

export type CalendarCellButtonOptions = ButtonOptions &
  Pick<
    CalendarStateReturn,
    "getCellOptions" | "focusedDate" | "selectDate" | "setFocusedDate"
  > & {
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
    const ref = React.useRef<HTMLElement>(null);

    // Focus the button in the DOM when the state updates.
    React.useEffect(() => {
      if (isFocused && ref.current) {
        ensureFocus(ref.current);
      }
    }, [cellDate, focusedDate, isFocused, ref]);

    const onClick = React.useCallback(() => {
      if (!disabled) {
        selectDate(cellDate);
        setFocusedDate(cellDate);
      }
    }, [cellDate, disabled, selectDate, setFocusedDate]);

    const onFocus = React.useCallback(() => {
      if (!disabled) {
        setFocusedDate(cellDate);
      }
    }, [cellDate, disabled, setFocusedDate]);

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
    let ariaLabel = dateFormatter.format(cellDate);
    if (isToday) {
      // If date is today, set appropriate string depending on selected state:
      ariaLabel = isSelected
        ? `Today, ${ariaLabel} selected`
        : `Today, ${ariaLabel}`;
    } else if (isSelected) {
      // If date is selected but not today:
      ariaLabel = `${ariaLabel} selected`;
    }

    return {
      children: useDateFormatter({ day: "numeric" }).format(cellDate),
      tabIndex,
      "aria-label": ariaLabel,
      "aria-disabled": ariaAttr(disabled),
      ref: useForkRef(ref, htmlRef),
      onClick: callAllHandlers(htmlOnClick, onClick),
      onFocus: callAllHandlers(htmlOnFocus, onFocus),
      ...htmlProps,
    };
  },
});

export const CalendarCellButton = createComponent({
  as: "span",
  memo: true,
  useHook: useCalendarCellButton,
});
