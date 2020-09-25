import React from "react";
import { useCompositeState, useDisclosureState } from "reakit";

import { useCalendarState } from "../calendar-v1";
import { useDatePickerFieldState } from "./useDatePickerFieldState";

interface DatePickerInitialProps {
  initialDate?: Date;
  dateFormat?: Intl.DateTimeFormatOptions;
}

export const useDatePickerState = ({
  dateFormat,
  initialDate = new Date(),
}: DatePickerInitialProps = {}) => {
  const [date, setDate] = React.useState(initialDate);

  const segmentComposite = useCompositeState({ orientation: "horizontal" });
  const disclosure = useDisclosureState();

  const calendar = useCalendarState({
    autoFocus: true,
    value: date,
    onChange: date => {
      setDate(new Date(date));
      disclosure.hide();
    },
  });

  const fieldState = useDatePickerFieldState({
    formatOptions: dateFormat,
    value: date,
    onChange(v) {
      setDate(new Date(v));
      calendar.focusCell(new Date(v));
    },
  });

  return {
    ...fieldState,
    ...segmentComposite,
    ...disclosure,
    ...calendar,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
