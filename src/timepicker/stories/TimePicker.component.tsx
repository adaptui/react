import React from "react";
import {
  TimePicker,
  TimePickerColumn,
  TimePickerSegment,
  TimePickerTrigger,
  TimePickerContent,
  useTimePickerState,
  TimePickerColumnValue,
  TimePickerSegmentField,
  TimePickerStateProps,
} from "renderless-components";

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

interface AppProps extends TimePickerStateProps {}

export const App: React.FC<AppProps> = props => {
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
