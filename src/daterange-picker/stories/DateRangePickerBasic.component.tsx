import React from "react";

import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerLabel,
  DatePickerPopover,
  DateRangePickerBaseStateProps,
  useDateRangePickerBaseState,
  useDateRangePickerState,
} from "../../index";
import CalendarRange from "../../range-calendar/stories/RangeCalendarBasic.component";

import { CalendarIcon } from "./Utils.component";

export type DateRangePickerBasicProps = DateRangePickerBaseStateProps & {};

export const DateRangePickerBasic: React.FC<
  DateRangePickerBasicProps
> = props => {
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div className="datepicker">
      <DatePickerLabel state={daterangepicker} className="datepicker__label">
        {props.label}
      </DatePickerLabel>
      <DatePickerGroup state={daterangepicker} className="datepicker__group">
        <DateFieldBasic {...daterangepicker.startFieldProps} />
        <DateFieldBasic {...daterangepicker.endFieldProps} />
        <DatePickerDisclosure
          state={daterangepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
      </DatePickerGroup>
      {state.popover.visible && (
        <DatePickerPopover state={daterangepicker} className="popover">
          <CalendarRange {...daterangepicker.calendarProps} />
        </DatePickerPopover>
      )}
    </div>
  );
};

export default DateRangePickerBasic;
