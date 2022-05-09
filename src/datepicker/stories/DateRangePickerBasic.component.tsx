import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

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

import DatePickerBasic from "./DatePickerBasic.component";
import { CalendarIcon } from "./Utils.component";

export type DateRangePickerBasicProps = DateRangePickerBaseStateProps & {};

export const DateRangePickerBasic: React.FC<
  DateRangePickerBasicProps
> = props => {
  const { locale } = useLocale();
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={daterangepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <DateFieldBasic
          {...daterangepicker.startFieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <div aria-hidden="true" className="datepicker__dash" />
        <DateFieldBasic
          {...daterangepicker.endFieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <DatePickerDisclosure
          state={daterangepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={daterangepicker} className="popover">
            <CalendarRange
              {...daterangepicker.calendarProps}
              locale={locale}
              createCalendar={createCalendar}
            />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DatePickerBasic;
