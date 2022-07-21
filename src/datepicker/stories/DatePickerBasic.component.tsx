import React from "react";

import CalendarBasic from "../../calendar/stories/CalendarBasic.component";
import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerBaseStateProps,
  DatePickerDisclosure,
  DatePickerGroup,
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
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={datepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <DateFieldBasic {...datepicker.fieldProps} />
        <DatePickerDisclosure
          state={datepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={datepicker} className="popover">
            <CalendarBasic {...datepicker.calendarProps} />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DatePickerBasic;
