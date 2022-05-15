import React from "react";
import { VisuallyHidden } from "ariakit";

import {
  TimeField,
  TimeFieldBaseStateProps,
  TimeFieldLabel,
  TimeSegment,
  useTimeFieldBaseState,
  useTimeFieldState,
} from "../../index";

export type TimeFieldStyledProps = TimeFieldBaseStateProps & {};

export const TimeFieldStyled: React.FC<TimeFieldStyledProps> = props => {
  const state = useTimeFieldBaseState({ ...props });
  const timefield = useTimeFieldState({ ...props, state });

  return (
    <>
      <VisuallyHidden as={TimeFieldLabel} state={timefield}>
        {props.label}
      </VisuallyHidden>
      <TimeField state={timefield} className="flex justify-between space-x-1">
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className="font-mono focus:text-blue-500 focus:outline-none"
          >
            {segment.text}
          </TimeSegment>
        ))}
      </TimeField>
    </>
  );
};

export default TimeFieldStyled;