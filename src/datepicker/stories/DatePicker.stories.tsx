import * as React from "react";
import { Meta } from "@storybook/react";
import { addDays, addWeeks, subWeeks } from "date-fns";

import { DatePicker } from "../DatePicker";
import { DatePickerContent } from "../DatePickerContent";
import { useDatePickerState } from "../DatePickerState";
import { DatePickerTrigger } from "../DatePickerTrigger";
import { Calendar } from "./Calendar";
import { DatePickerSegmentInput } from "../DatePickerSegmentInput";
import { DatePickerSegment } from "../DatePickerSegment";

import "./index.css";

export default {
  title: "Component/DatePicker",
} as Meta;

const DatePickerComp: React.FC = props => {
  const state = useDatePickerState();

  return (
    <DatePicker {...state}>
      <div className="datepicker__header">
        <DatePickerSegmentInput style={{ display: "flex" }} {...state}>
          <DatePickerSegment {...state} type="date" />
          /
          <DatePickerSegment {...state} type="month" />
          /
          <DatePickerSegment {...state} type="year" />
        </DatePickerSegmentInput>
        <DatePickerTrigger
          as="button"
          className="datepicker__trigger"
          {...state}
        >
          Open
        </DatePickerTrigger>
      </div>
      <DatePickerContent {...state}>
        <Calendar {...state} />
      </DatePickerContent>
    </DatePicker>
  );
};

export const Default = () => <DatePickerComp />;
