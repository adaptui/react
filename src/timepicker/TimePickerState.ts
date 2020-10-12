import * as React from "react";
import { useControllableState } from "@chakra-ui/hooks";
import { ValueBase, FocusableProps } from "@react-types/shared";

import { useSegmentState } from "../segment";
import { DateTimeFormatOptions } from "../utils/types";
import { useTimePickerColumnState } from "./TimePickerColumnState";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";
import { stringifyTime, parseTime } from "./__utils";

// TODO: Voice Overing all button on dialog open
export interface TimePickerStateProps
  extends PickerBaseInitialState,
    FocusableProps,
    ValueBase<string> {
  formatOptions?: DateTimeFormatOptions;
  placeholderDate?: Date;
}

export const useTimePickerState = (props: TimePickerStateProps = {}) => {
  const {
    value: initialValue,
    defaultValue: defaultValueProp = stringifyTime(new Date()),
    onChange: onChangeProp,
    formatOptions = { timeStyle: "short" },
    placeholderDate,
    autoFocus,
  } = props;

  const onChange = React.useCallback(
    (date: Date) => {
      return onChangeProp?.(stringifyTime(date));
    },
    [onChangeProp],
  );

  const [time, setTime] = useControllableState({
    value: parseTime(initialValue),
    defaultValue: parseTime(defaultValueProp) || new Date(),
    onChange,
  });

  const segmentState = useSegmentState({
    value: time,
    onChange: setTime,
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({ focus: segmentState.first, ...props });

  const setTimeProp = (date: Date) => {
    setTime(date);
    popover.hide();
  };

  const hourState = useTimePickerColumnState({
    columnType: "hour",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const minuteState = useTimePickerColumnState({
    columnType: "minute",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const meridiesState = useTimePickerColumnState({
    columnType: "meridian",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
  });

  const hours = [...new Array(13).keys()].slice(1);
  const minutes = [...new Array(60).keys()];
  const meridies = ["AM", "PM"];

  React.useEffect(() => {
    if (autoFocus) {
      segmentState.first();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentState.first]);

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
