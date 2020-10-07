import * as React from "react";
import { Meta } from "@storybook/react";

import { TimePicker } from "../TimePicker";
import { TimePickerColumn } from "../TimePickerColumn";
import { TimePickerContent } from "../TimePickerContent";
import { TimePickerTrigger } from "../TimePickerTrigger";
import { TimePickerColumnValue } from "../TimePickerColumnValue";
import { TimeSegmentField } from "../TimeSegmentField";
import { TimeSegment } from "../TimeSegment";
import { useTimePickerState, TimePickerStateProps } from "../TimePickerState";

import "./index.css";

export default {
  title: "Component/TimePicker",
} as Meta;

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

const TimePickerComp: React.FC<TimePickerStateProps> = props => {
  const state = useTimePickerState(props);
  console.log("%c state", "color: #d0bfff", state);

  return (
    <>
      <TimePicker className="timepicker" {...state}>
        <div className="timepicker__header">
          <TimeSegmentField {...state} className="timepicker__field">
            {state.segments.map((segment, i) => (
              <TimeSegment
                key={i}
                segment={segment}
                className="timepicker__field--item"
                {...state}
              />
            ))}
          </TimeSegmentField>
          <TimePickerTrigger className="timepicker__trigger" {...state}>
            <CalendarIcon />
          </TimePickerTrigger>
        </div>
      </TimePicker>
      <TimePickerContent className="timepicker__content" {...state}>
        <TimePickerColumn className="timepicker__column" {...state.hourState}>
          {state.hours.map(n => {
            return (
              <TimePickerColumnValue
                className="timepicker__column--value"
                value={n}
                {...state.hourState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn className="timepicker__column" {...state.minuteState}>
          {state.minutes.map(n => {
            return (
              <TimePickerColumnValue
                className="timepicker__column--value"
                value={n}
                {...state.minuteState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn
          className="timepicker__column"
          {...state.meridiesState}
        >
          {state.meridies.map(n => {
            return (
              <TimePickerColumnValue
                className="timepicker__column--value"
                value={n}
                {...state.meridiesState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
      </TimePickerContent>
    </>
  );
};

export const Default = () => <TimePickerComp />;
export const DefaultTime = () => <TimePickerComp value="21:45" />;
