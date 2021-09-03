import * as React from "react";

import {
  TimePicker,
  TimePickerColumn,
  TimePickerSegment,
  TimePickerTrigger,
  TimePickerContent,
  useTimePickerState,
  TimePickerColumnValue,
  TimePickerSegmentField,
  TimePickerInitialState,
} from "../../index";
import { CalendarIcon } from "./Utils.component";

export const App: React.FC<TimePickerInitialState> = props => {
  const state = useTimePickerState(props);

  return (
    <>
      <TimePicker className="timepicker" {...state}>
        <div className="timepicker__header">
          <TimePickerSegmentField {...state} className="timepicker__field">
            {state.segments.map((segment, i) => (
              <TimePickerSegment
                key={i}
                segment={segment}
                className="timepicker__field--item"
                {...state}
              />
            ))}
          </TimePickerSegmentField>
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
                key={n}
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
          {state.minutes.map((n, i) => {
            return (
              <TimePickerColumnValue
                key={n}
                className="timepicker__column--value"
                value={i}
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
          {state.meridies.map((n, i) => {
            return (
              <TimePickerColumnValue
                key={n}
                className="timepicker__column--value"
                value={i}
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

export default App;
