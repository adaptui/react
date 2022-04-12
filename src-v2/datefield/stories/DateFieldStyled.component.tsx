import React from "react";

import { DateSegment } from "../date-segment";
import { DateField } from "../datefield";
import {
  DateFieldBaseStateProps,
  useDateFieldBaseState,
} from "../datefield-base-state";
import { useDateFieldState } from "../datefield-state";

export type DateFieldStyledProps = DateFieldBaseStateProps & {};

export const DateFieldStyled: React.FC<DateFieldStyledProps> = props => {
  const state = useDateFieldBaseState({ ...props });
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
