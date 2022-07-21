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

export type DateFieldStyledProps = Omit<
  DateFieldBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const DateFieldStyled: React.FC<DateFieldStyledProps> = props => {
  let { locale } = useLocale();

  const state = useDateFieldBaseState({ locale, createCalendar, ...props });
  const datefield = useDateFieldState({ ...props, state });

  return (
    <DateField state={datefield} className="flex justify-between space-x-1">
      {state.segments.map((segment, i) => (
        <DateSegment
          key={i}
          segment={segment}
          state={state}
          className="font-mono focus:text-blue-500 focus:outline-none"
        >
          {segment.text}
        </DateSegment>
      ))}
    </DateField>
  );
};

export default DateFieldStyled;
