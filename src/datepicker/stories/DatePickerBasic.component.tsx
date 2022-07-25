import React from "react";

import CalendarBasic from "../../calendar/stories/CalendarBasic.component";
import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerBaseStateProps,
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerLabel,
  DatePickerPopover,
  useDatePickerBaseState,
  useDatePickerState,
} from "../../index";

import { CalendarIcon } from "./Utils.component";

export type DatePickerBasicProps = DatePickerBaseStateProps & {};

export const DatePickerBasic: React.FC<DatePickerBasicProps> = props => {
  const state = useDatePickerBaseState({ ...props, gutter: 10 });
  const datepicker = useDatePickerState({ ...props, state });

  return (
    <div className="datepicker">
      <DatePickerLabel state={datepicker} className="datepicker__label">
        {props.label}
      </DatePickerLabel>
      <DatePickerGroup state={datepicker} className="datepicker__group">
        <DateFieldBasic {...datepicker.fieldProps} />
        <DatePickerDisclosure
          state={datepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
      </DatePickerGroup>
      {state.popover.open && (
        <DatePickerPopover state={datepicker} className="popover">
          <CalendarBasic {...datepicker.calendarProps} />
        </DatePickerPopover>
      )}
    </div>
  );
};

export default DatePickerBasic;
