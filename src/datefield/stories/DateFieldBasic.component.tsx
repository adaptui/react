import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  DateField,
  DateFieldBaseStateProps,
  DateSegment,
  useDateFieldBaseState,
  useDateFieldState,
} from "../../index";

import "./DateFieldBasic.css";

/** Omiting locale and createCalendar */
export type DateFieldBasicProps = Omit<
  DateFieldBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const DateFieldBasic: React.FC<DateFieldBasicProps> = props => {
  const { locale } = useLocale();
  const state = useDateFieldBaseState({ ...props, locale, createCalendar });
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

export default DateFieldBasic;
