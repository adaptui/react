import { isString } from "@chakra-ui/utils";
import { useControllableState } from "@chakra-ui/hooks";

import { useSegmentState } from "../segment";
import { DateTimeFormatOptions, DateValue } from "../utils/types";
import { useTimePickerColumnState } from "./TimePickerColumnState";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

// TODO: Voice Overing all button on dialog open
export interface TimePickerStateProps extends PickerBaseInitialState {
  value?: DateValue;
  defaultValue?: DateValue;
  onChange?: (v: DateValue) => void;
  formatOptions?: DateTimeFormatOptions;
  placeholderDate?: Date;
}

export const useTimePickerState = (props: TimePickerStateProps = {}) => {
  const {
    value: initialValue,
    defaultValue: defaultValueProp = new Date(),
    onChange,
    formatOptions = { timeStyle: "short" },
    placeholderDate,
  } = props;

  const [time, setTime] = useControllableState({
    value: parseTime(initialValue),
    defaultValue: parseTime(defaultValueProp),
    onChange,
  });

  const segmentState = useSegmentState({
    value: time,
    onChange: setTime,
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({ focus: segmentState.first });

  const setTimeProp = (date: Date) => {
    setTime(date);
    popover.hide();
  };

  const hourState = useTimePickerColumnState({
    type: "hour",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const minuteState = useTimePickerColumnState({
    type: "minute",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const meridiesState = useTimePickerColumnState({
    type: "meridian",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const hours = [...new Array(13).keys()].slice(1);
  const minutes = [...new Array(60).keys()];
  const meridies = ["AM", "PM"];

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

function parseTime(timeValue: DateValue | undefined) {
  if (timeValue == null) return;

  if (isString(timeValue)) {
    const timeRegex = timeValue.match(/(\d+)(:(\d\d))?\s*(p?)/i);
    if (timeRegex == null) return;

    const time = timeValue.split(":");
    const date = new Date();

    date.setHours(parseInt(time[0], 10));
    date.setMinutes(parseInt(time[1], 10));
    date.setSeconds(0, 0);

    return date;
  }

  return new Date(timeValue);
}

function pad(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
