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

export type TimeFieldBasicProps = Omit<TimeFieldBaseStateProps, "locale"> & {};

// Example from https://react-spectrum.adobe.com/react-aria/useTimeField.html
export const TimeFieldBasic: React.FC<TimeFieldBasicProps> = props => {
  let { locale } = useLocale();

  const state = useTimeFieldBaseState({ locale, ...props });
  const datefield = useTimeFieldState({ ...props, state });

  return (
    <div className="timefield">
      <TimeFieldLabel state={datefield} className="timefield__label">
        {props.label}
      </TimeFieldLabel>
      <TimeField state={datefield} className="timefield__field">
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className={`timefield__field--item ${
              segment.isPlaceholder ? "placeholder" : ""
            }`}
          >
            {segment.text}
          </TimeSegment>
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </TimeField>
    </div>
  );
};

export default TimeFieldBasic;
