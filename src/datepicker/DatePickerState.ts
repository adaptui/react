import React from "react";
import { useCompositeState, useDisclosureState } from "reakit";

import { useCalendarState, CalendarStateInitialProps } from "../calendar-v1";
import { useDatePickerFieldState } from "./DatePickerFieldState";

export interface DatePickerStateInitialProps extends CalendarStateInitialProps {
  visible?: boolean;
  initialDate?: Date;
  dateFormat?: Intl.DateTimeFormatOptions;
}

export const useDatePickerState = (props: DatePickerStateInitialProps = {}) => {
  const { visible, dateFormat, initialDate = new Date() } = props;

  const [date, setDate] = React.useState(initialDate);

  const segmentComposite = useCompositeState({ orientation: "horizontal" });
  const disclosure = useDisclosureState({ visible });

  const calendar = useCalendarState({
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

  React.useEffect(() => {
    if (disclosure.visible) {
      calendar.setFocused(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disclosure.visible]);

  return {
    calendar,
    ...fieldState,
    ...segmentComposite,
    ...disclosure,
  };
};

export type DatePickerStateReturn = ReturnType<typeof useDatePickerState>;
