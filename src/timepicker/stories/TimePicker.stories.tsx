import * as React from "react";
import { Meta } from "@storybook/react";

import { TimePicker } from "../TimePicker";
import { TimePickerColumn } from "../TimePickerColumn";
import { TimePickerColumnValue } from "../TimePickerColumnValue";
import { useTimePickerState, TimePickerStateProps } from "../TimePickerState";

import "./index.css";

export default {
  title: "Component/TimePicker",
} as Meta;

const TimePickerComp: React.FC<TimePickerStateProps> = props => {
  const state = useTimePickerState(props);

  return (
    <>
      <TimePicker className="timepicker" {...state}>
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
      </TimePicker>
    </>
  );
};

export const Default = () => <TimePickerComp />;
export const DefaultTimme = () => (
  <>
    <TimePickerComp
      onChange={d => console.log({ d: d?.toLocaleTimeString() })}
      value="21:45"
    />
  </>
);
