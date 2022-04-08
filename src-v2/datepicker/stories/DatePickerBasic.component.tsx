import React, { useRef } from "react";
import { createCalendar } from "@internationalized/date";
import { useButton } from "@react-aria/button";
import { useLocale } from "@react-aria/i18n";
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from "ariakit";

import CalendarBasic from "../../calendar/stories/CalendarBasic.component";
import { DateSegment } from "../date-segment";
import { DateField } from "../datefield";
import {
  DateFieldBaseStateProps,
  useDateFieldBaseState,
} from "../datefield-base-state";
import { useDateFieldState } from "../datefield-state";
import {
  DatePickerBaseStateProps,
  useDatePickerBaseState,
} from "../datepicker-base-state";
import { DatePickerGroup } from "../datepicker-group";
import { useDatePickerState } from "../datepicker-state";

import { CalendarIcon } from "./Utils.component";

export type DatePickerBasicProps = DatePickerBaseStateProps & {};

export const DatePickerBasic: React.FC<DatePickerBasicProps> = props => {
  const { locale } = useLocale();
  const state = useDatePickerBaseState({ ...props });
  const datepicker = useDatePickerState({ ...props, state });
  const ref = useRef(null);
  const { buttonProps } = useButton(datepicker.buttonProps, ref);
  const popover = usePopoverState();

  return (
    <div style={{ position: "relative" }} className="datepicker">
      {/* <DatePickerLabel state={datepicker}>Date</DatePickerLabel> */}
      <DatePickerGroup state={datepicker} className="datepicker__header">
        <DateFieldComp
          {...datepicker.fieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <PopoverDisclosure
          state={popover}
          {...buttonProps}
          ref={ref}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </PopoverDisclosure>
      </DatePickerGroup>
      <Popover state={popover} className="popover">
        <PopoverArrow className="arrow" />
        <CalendarBasic
          {...datepicker.calendarProps}
          autoFocus
          locale={locale}
          createCalendar={createCalendar}
        />
      </Popover>
    </div>
  );
};

export default DatePickerBasic;

export type DateFieldCompProps = DateFieldBaseStateProps & {};

export const DateFieldComp: React.FC<DateFieldCompProps> = props => {
  const state = useDateFieldBaseState({ ...props });
  const datefield = useDateFieldState({ ...props, state });

  return (
    <DateField state={datefield} className="datepicker__field">
      {state.segments.map((segment, i) => (
        <DateSegment
          key={i}
          segment={segment}
          state={state}
          className="datepicker__field--item"
        >
          {segment.text}
        </DateSegment>
      ))}
    </DateField>
  );
};
