import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { ariaAttr } from "@chakra-ui/utils";
import { getDayOfWeek, isSameDay } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";

import { CalendarCellState } from "./calendar-cell-state";
import { RangeCalendarBaseState } from "./range-calendar-base-state";

export const useCalendarCell = createHook<CalendarCellOptions>(
  ({ state, ...props }) => {
    const { baseState } = state;

    const isLastSelectedBeforeDisabled =
      !state.isDisabled &&
      baseState.isCellUnavailable(state.date.add({ days: 1 }));
    const isFirstSelectedAfterDisabled =
      !state.isDisabled &&
      baseState.isCellUnavailable(state.date.subtract({ days: 1 }));
    let highlightedRange =
      "highlightedRange" in baseState &&
      (baseState as RangeCalendarBaseState).highlightedRange;
    let isSelectionStart =
      state.isSelected &&
      highlightedRange &&
      isSameDay(state.date, highlightedRange.start);
    let isSelectionEnd =
      state.isSelected &&
      highlightedRange &&
      isSameDay(state.date, highlightedRange.end);
    const { locale } = useLocale();
    const dayOfWeek = getDayOfWeek(state.date, locale);
    let isRangeStart =
      state.isSelected &&
      (isFirstSelectedAfterDisabled || dayOfWeek === 0 || state.date.day === 1);
    const isRangeEnd =
      state.isSelected &&
      (isLastSelectedBeforeDisabled ||
        dayOfWeek === 6 ||
        state.date.day ===
          baseState.visibleRange.start.calendar.getDaysInMonth(
            baseState.visibleRange.start,
          ));

    props = {
      "data-is-range-selection": ariaAttr(
        state.isSelected && "highlightedRange" in baseState,
      ),
      "data-is-range-end": ariaAttr(isRangeEnd),
      "data-is-range-start": ariaAttr(isRangeStart),
      "data-is-selection-end": ariaAttr(isSelectionEnd),
      "data-is-selection-start": ariaAttr(isSelectionStart),
      ...props,
    };

    props = mergeProps(state.cellProps, props);

    return props;
  },
);

export const CalendarCell = createComponent<CalendarCellOptions>(props => {
  const htmlProps = useCalendarCell(props);

  return createElement("td", htmlProps);
});

export type CalendarCellOptions<T extends As = "td"> = Options<T> & {
  /**
   * Object returned by the `useCalendarCellState` hook.
   */
  state: CalendarCellState;
};

export type CalendarCellProps<T extends As = "td"> = Props<
  CalendarCellOptions<T>
>;
