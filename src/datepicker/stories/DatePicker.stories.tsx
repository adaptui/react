import * as React from "react";
import { Meta } from "@storybook/react";
import { addWeeks, subWeeks, format } from "date-fns";

import "./index.css";
import {
  DatePicker,
  DatePickerSegment,
  DatePickerSegmentField,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerInitialState,
} from "../index";
import { CalendarComp } from "../../calendar/stories/CalendarComponent";

export default {
  title: "Component/DatePicker",
} as Meta;

const DatePickerComp: React.FC<DatePickerInitialState> = props => {
  const state = useDatePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker className="datepicker" {...state}>
        <div className="datepicker__header">
          <DatePickerSegmentField {...state} className="datepicker__field">
            {state.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
              />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <CalendarComp {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const Default = () => <DatePickerComp />;

export const InitialDate = () => <DatePickerComp defaultValue="2001-01-01" />;

export const ControllableState = () => {
  const [value, setValue] = React.useState("2020-10-13");

  return (
    <div>
      <input
        type="date"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <DatePickerComp value={value} onChange={setValue} />
    </div>
  );
};

export const MinMaxDate = () => (
  <DatePickerComp
    minValue={format(new Date(), "yyyy-MM-dd")}
    maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
  />
);

export const InValidDate = () => (
  <DatePickerComp
    defaultValue={format(addWeeks(new Date(), 2), "yyyy-MM-dd")}
    minValue={format(subWeeks(new Date(), 1), "yyyy-MM-dd")}
    maxValue={format(addWeeks(new Date(), 1), "yyyy-MM-dd")}
  />
);

export const isDisabled = () => <DatePickerComp isDisabled />;

export const isReadOnly = () => <DatePickerComp isReadOnly />;

export const autoFocus = () => (
  // eslint-disable-next-line jsx-a11y/no-autofocus
  <DatePickerComp autoFocus />
);
