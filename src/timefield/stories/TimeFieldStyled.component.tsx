import React from "react";
import { useLocale } from "@react-aria/i18n";

import {
  TimeField,
  TimeFieldBaseStateProps,
  TimeFieldLabel,
  TimeSegment,
  useTimeFieldBaseState,
  useTimeFieldState,
} from "../../index";

export type TimeFieldStyledProps = Omit<TimeFieldBaseStateProps, "locale"> & {};

export const TimeFieldStyled: React.FC<TimeFieldStyledProps> = props => {
  let { locale } = useLocale();

  const state = useTimeFieldBaseState({ locale, ...props });
  const datefield = useTimeFieldState({ ...props, state });

  return (
    <div className="flex flex-col items-start">
      <TimeFieldLabel state={datefield} className="mb-2">
        {props.label}
      </TimeFieldLabel>
      <TimeField
        state={datefield}
        className="rounded-sm border-solid border inline-flex px-1 py-px border-[#6f6f6f]"
      >
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className={`rounded py-0 px-px font-mono focus:text-blue-500 focus:outline-none ${
              segment.isPlaceholder ? "text-[#767676]" : ""
            }`}
          >
            {segment.text}
          </TimeSegment>
        ))}
      </TimeField>
    </div>
  );
};

export default TimeFieldStyled;
