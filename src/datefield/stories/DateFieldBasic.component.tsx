import React from "react";

import { DateSegment } from "../date-segment";
import { DateField } from "../datefield";
import {
  DateFieldBaseStateProps,
  useDateFieldBaseState,
} from "../datefield-base-state";
import { useDateFieldState } from "../datefield-state";

export type DateFieldBasicProps = DateFieldBaseStateProps & {};

export const DateFieldBasic: React.FC<DateFieldBasicProps> = props => {
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

export default DateFieldBasic;
