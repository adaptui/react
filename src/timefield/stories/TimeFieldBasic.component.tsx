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

export type TimeFieldBasicProps = TimeFieldBaseStateProps & {};

export const TimeFieldBasic: React.FC<TimeFieldBasicProps> = props => {
  const state = useTimeFieldBaseState({ ...props });
  const timefield = useTimeFieldState({ ...props, state });

  return (
    <>
      <VisuallyHidden as={TimeFieldLabel} state={timefield}>
        {props.label}
      </VisuallyHidden>
      <TimeField state={timefield} className="datepicker__field">
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className="datepicker__field--item"
          >
            {segment.text}
          </TimeSegment>
        ))}
      </TimeField>
    </>
  );
};

export default TimeFieldBasic;
