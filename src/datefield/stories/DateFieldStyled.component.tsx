import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  DateField,
  DateFieldBaseStateProps,
  DateFieldLabel,
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
    <div className="flex flex-col items-start">
      <DateFieldLabel state={datefield} className="mb-2">
        {props.label}
      </DateFieldLabel>
      <DateField
        state={datefield}
        className="rounded-sm border-solid border inline-flex px-1 py-px border-[#6f6f6f]"
      >
        {state.segments.map((segment, i) => (
          <DateSegment
            key={i}
            segment={segment}
            state={state}
            className={`rounded py-0 px-px font-mono focus:text-blue-500 focus:outline-none ${
              segment.isPlaceholder ? "text-[#767676]" : ""
            }`}
          >
            {segment.text}
          </DateSegment>
        ))}
      </DateField>
    </div>
  );
};

export default DateFieldStyled;
