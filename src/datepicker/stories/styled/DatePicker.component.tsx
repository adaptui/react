import * as React from "react";

import {
  DatePickerSegment,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerSegmentField,
  DatePickerInitialState,
  DatePicker as DatePickerWrapper,
} from "../../index";
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
        className="relative inline-block bg-white border border-gray-300 rounded-md shadow-sm styled-datepicker w-max"
        {...state}
      >
        <div className="flex justify-between p-2 pl-4 pr-4 space-x-4 rounded-md">
          <DatePickerSegmentField
            {...state}
            className="flex justify-between space-x-1"
          >
            {state.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                {...state}
                className="font-mono focus:text-blue-500 focus:outline-none"
              />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger
            className="relative inline-block text-gray-700 focus:outline-none focus:text-blue-500"
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
