import React from "react";

import CalendarRangeStyled from "../../calendar/stories/CalendarRangeStyled.component";
import DateFieldStyled from "../../datefield/stories/DateFieldStyled.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerPopover,
  DateRangePickerBaseStateProps,
  useDateRangePickerBaseState,
  useDateRangePickerState,
} from "../../index";

import { CalendarStyledIcon } from "./Utils.component";

export type DateRangePickerStyledProps = DateRangePickerBaseStateProps & {};

export const DateRangePickerStyled: React.FC<
  DateRangePickerStyledProps
> = props => {
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div className="relative inline-block bg-white border border-gray-300 rounded-md shadow-sm styled-datepicker w-max">
      <DatePickerGroup
        state={daterangepicker}
        className="flex justify-between items-center p-2 pl-4 pr-4 space-x-4 rounded-md"
        aria-label="DatePicker"
      >
        <DateFieldStyled {...daterangepicker.startFieldProps} />
        <div aria-hidden="true" className="datepicker__dash" />
        <DateFieldStyled {...daterangepicker.endFieldProps} />
        <DatePickerDisclosure
          state={daterangepicker}
          className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-border-400"
        >
          <CalendarStyledIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={daterangepicker} className="popover">
            <CalendarRangeStyled {...daterangepicker.calendarProps} />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DateRangePickerStyled;
