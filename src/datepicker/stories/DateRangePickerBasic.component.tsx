import React from "react";

import CalendarRange from "../../calendar/stories/CalendarRange.component";
import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerPopover,
  DateRangePickerBaseStateProps,
  useDateRangePickerBaseState,
  useDateRangePickerState,
} from "../../index";

import { CalendarIcon } from "./Utils.component";

export type DateRangePickerBasicProps = DateRangePickerBaseStateProps & {};

export const DateRangePickerBasic: React.FC<
  DateRangePickerBasicProps
> = props => {
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={daterangepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <DateFieldBasic {...daterangepicker.startFieldProps} />
        <div aria-hidden="true" className="datepicker__dash" />
        <DateFieldBasic {...daterangepicker.endFieldProps} />
        <DatePickerDisclosure
          state={daterangepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={daterangepicker} className="popover">
            <CalendarRange {...daterangepicker.calendarProps} />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DateRangePickerBasic;
