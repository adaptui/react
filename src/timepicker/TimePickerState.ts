import * as React from "react";
import { useControllableState } from "@chakra-ui/hooks";
import { PopoverInitialState, usePopoverState } from "reakit";
import { useTimePickerColumnState } from "./TimePickerColumnState";
import { useSegmentState } from "../segment-spinner/SegmentState";

export interface TimePickerStateProps extends PopoverInitialState {
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholderDate?: Date;
}

export const useTimePickerState = (props: TimePickerStateProps = {}) => {
  const {
    value: initialValue,
    defaultValue: defaultValueProp,
    onChange,
    formatOptions = { timeStyle: "short" },
    placeholderDate,
  } = props;

  const [timeProp, setTimeProp] = useControllableState({
    value: initialValue,
    defaultValue: defaultValueProp,
    onChange,
  });
  console.log("%c timeProp", "color: #99adcc", timeProp);

  const defaultValue =
    defaultValueProp && isValidTime(defaultValueProp)
      ? parseTime(defaultValueProp)
      : parseTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
  const time = timeProp == null ? defaultValue : parseTime(timeProp);

  const setTime = (hour: number, minute: number, meridian: string) => {
    if (meridian === "PM") {
      hour = +hour + 12;
    } else {
      hour = hour % 12;
    }

    setTimeProp(`${pad(hour)}:${pad(minute)}`);
  };

  const [hour, setHourProp] = React.useState(time?.getHours() % 12);
  const [minute, setMinuteProp] = React.useState(time?.getMinutes());
  const [meridian, setMeridianProp] = React.useState(
    time?.getHours() >= 12 ? "PM" : "AM",
  );

  const setHour = (hour: number) => {
    setHourProp(hour);
    setTime(hour, minute, meridian);
  };

  const setMinute = (minute: number) => {
    setMinuteProp(minute);
    setTime(hour, minute, meridian);
  };

  const setMeridian = (meridianValue: string) => {
    setMeridianProp(meridianValue);
    setTime(hour, minute, meridianValue);
  };

  const hourState = useTimePickerColumnState({
    value: hour,
    onChange: setHour,
    onSelection: () => popover.hide(),
  });

  const minuteState = useTimePickerColumnState({
    value: minute,
    onChange: setMinute,
    onSelection: () => popover.hide(),
  });

  const meridiesState = useTimePickerColumnState({
    value: meridian,
    onChange: setMeridian,
    onSelection: () => popover.hide(),
  });

  const hours = [...new Array(13).keys()].slice(1);
  const minutes = [...new Array(60).keys()];
  const meridies = ["AM", "PM"];

  const setSegmentTime = (date: Date) => {
    setTimeProp(`${date.getHours()}:${date.getMinutes()}`);
  };

  const segmentState = useSegmentState({
    value: time,
    defaultValue,
    onChange: setSegmentTime,
    formatOptions,
    placeholderDate,
  });

  const popover = usePopoverState({ modal: true, ...props });

  return {
    time,
    hours,
    minutes,
    meridies,
    hourState,
    minuteState,
    meridiesState,
    ...popover,
    ...segmentState,
  };
};

export type TimePickerStateReturn = ReturnType<typeof useTimePickerState>;

function isValidTime(timeString: string | undefined) {
  if (!timeString) return false;

  const time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
  if (time == null) return false;

  return true;
}

function parseTime(timeString: string) {
  const time = timeString.split(":");

  const date = new Date();
  date.setHours(parseInt(time[0], 10));
  date.setMinutes(parseInt(time[1], 10));
  date.setSeconds(0, 0);
  return date;
}

function pad(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
