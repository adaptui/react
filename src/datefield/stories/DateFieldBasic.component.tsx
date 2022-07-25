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

export type DateFieldBasicProps = Omit<
  DateFieldBaseStateProps,
  "locale" | "createCalendar"
> & {};

// Example from https://react-spectrum.adobe.com/react-aria/useDateField.html
export const DateFieldBasic: React.FC<DateFieldBasicProps> = props => {
  let { locale } = useLocale();

  const state = useDateFieldBaseState({ locale, createCalendar, ...props });
  const datefield = useDateFieldState({ ...props, state });

  return (
    <div className="datefield">
      <DateFieldLabel state={datefield} className="datefield__label">
        {props.label}
      </DateFieldLabel>
      <DateField state={datefield} className="datefield__field">
        {state.segments.map((segment, i) => (
          <DateSegment
            key={i}
            segment={segment}
            state={state}
            className={`datefield__field--item ${
              segment.isPlaceholder ? "placeholder" : ""
            }`}
          >
            {segment.text}
          </DateSegment>
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </DateField>
    </div>
  );
};

export default DateFieldBasic;
