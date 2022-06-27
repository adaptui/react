import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import CalendarStyled from "../../calendar/stories/CalendarStyled.component";
import DateFieldStyled from "../../datefield/stories/DateFieldStyled.component";
import {
  DatePickerBaseStateProps,
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerPopover,
  useDatePickerBaseState,
  useDatePickerState,
} from "../../index";

import { CalendarStyledIcon } from "./Utils.component";

import "./DatePickerStyled.css";

export type DatePickerStyledProps = DatePickerBaseStateProps & {};

export const DatePickerStyled: React.FC<DatePickerStyledProps> = props => {
  const { locale } = useLocale();
  const state = useDatePickerBaseState({ ...props, gutter: 10 });
  const datepicker = useDatePickerState({ ...props, state });

  return (
    <div className="relative inline-block bg-white border border-gray-300 rounded-md shadow-sm styled-datepicker w-max">
      <DatePickerGroup
        state={datepicker}
        className="flex justify-between items-center p-2 pl-4 pr-4 space-x-4 rounded-md"
        aria-label="DatePicker"
      >
        <DateFieldStyled
          {...datepicker.fieldProps}
          // createCalendar={createCalendar}
          // locale={locale}
        />
        <DatePickerDisclosure
          state={datepicker}
          className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-border-400"
        >
          <CalendarStyledIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={datepicker} className="popover">
            <CalendarStyled
              {...datepicker.calendarProps}
              // locale={locale}
              // createCalendar={createCalendar}
            />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DatePickerStyled;
