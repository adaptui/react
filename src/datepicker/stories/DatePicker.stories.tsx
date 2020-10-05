import * as React from "react";
import { Meta } from "@storybook/react";

import "./index.css";
import {
  DatePicker,
  DateSegment,
  DateSegmentField,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerStateInitialProps,
} from "..";
import { CalendarComponent } from "../../calendar/stories/CalendarComponent";

export default {
  title: "Component/DatePicker",
} as Meta;

const DatePickerComp: React.FC<DatePickerStateInitialProps> = props => {
  const state = useDatePickerState(props);

  return (
    <DatePicker {...state}>
      <div className="datepicker__header">
        <DateSegmentField {...state} className="datepicker__field">
          {state.segments.map((segment, i) => (
            <DateSegment
              key={i}
              segment={segment}
              className="datepicker__field--item"
              {...state}
            />
          ))}
        </DateSegmentField>

        <DatePickerTrigger className="datepicker__trigger" {...state}>
          <CalendarIcon />
        </DatePickerTrigger>
      </div>
      <DatePickerContent {...state}>
        <CalendarComponent {...state.calendar} />
      </DatePickerContent>
    </DatePicker>
  );
};

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const Default = () => <DatePickerComp />;

export const InitialDate = () => (
  <DatePickerComp initialDate={new Date(2001, 0, 1)} />
);

export const Controllable = () => {
  const [date, setDate] = React.useState(new Date(2020, 0, 1));

  return <DatePickerComp value={date} onChange={val => console.log(val)} />;
};
