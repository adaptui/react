import * as React from "react";

import {
  DatePickerSegment,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerSegmentField,
  DatePickerInitialState,
  DatePicker as DatePickerWrapper,
} from "@renderlesskit/react";
import { Calendar, CalendarIcon } from "./Calendar";

export const DatePicker: React.FC<DatePickerInitialState> = props => {
  const state = useDatePickerState({
    gutter: 0,
    unstable_offset: [-19, 10],
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePickerWrapper
        className="styled-datepicker bg-white w-max rounded-md shadow-sm relative inline-block border border-gray-300"
        {...state}
      >
        <div className="flex gap-4 justify-between p-2 pr-4 pl-4 rounded-md">
          <DatePickerSegmentField
            {...state}
            className="flex justify-between gap-1"
          >
            {state.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state}
                className="focus:text-blue-500 focus:outline-none font-mono"
              />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger
            className="text-gray-700 focus:outline-none focus:text-blue-500 relative inline-block"
            {...state}
          >
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePickerWrapper>
      <DatePickerContent {...state}>
        <Calendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};
