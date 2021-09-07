import * as React from "react";
import { ValueBase } from "@react-types/shared";

import { useControllableState } from "../utils";
import { stringifyTime, parseTime } from "./helpers";
import { SegmentInitialState, useSegmentState } from "../segment";
import { useTimePickerColumnState } from "./TimePickerColumnState";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";
import { announce } from "../utils/LiveAnnouncer";
import { formatDate } from "../utils";

export type TimePickerInitialState = PickerBaseInitialState &
  ValueBase<string> &
  Pick<Partial<SegmentInitialState>, "formatOptions" | "placeholderDate"> & {
    /**
     * Whether the element should receive focus on render.
     */
    autoFocus?: boolean;
  };

export const useTimePickerState = (props: TimePickerInitialState = {}) => {
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

  const [oldTime, setOldTime] = React.useState(new Date(time));

  const updateOldTime = () => {
    setOldTime(new Date(time));
  };

  const restoreOldTime = () => {
    setTime(new Date(oldTime));
    return new Date(oldTime);
  };

  const segmentState = useSegmentState({
    value: time,
    onChange: setTime,
    formatOptions,
    placeholderDate,
  });

  const popover = usePickerBaseState({
    segmentFocus: segmentState.first,
    ...props,
  });

  const setTimeProp = (date: Date) => {
    setTime(date);
  };

  const hourState = useTimePickerColumnState({
    columnType: "hour",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
    popover,
    updateOldTime,
    restoreOldTime,
  });

  const minuteState = useTimePickerColumnState({
    columnType: "minute",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
    popover,
    updateOldTime,
    restoreOldTime,
  });

  const meridiesState = useTimePickerColumnState({
    columnType: "meridian",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
    popover,
    updateOldTime,
    restoreOldTime,
  });

  const hours = [...new Array(13).keys()].slice(1);
  const minutes = [...new Array(60).keys()];
  const meridies = ["AM", "PM"];
  const announceSelectedDate = () => {
    announce(`Selected Time: ${formatDate(time, "h:m a")}`);
  };

  React.useEffect(() => {
    if (autoFocus) {
      segmentState.first();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, segmentState.first]);

  React.useEffect(() => {
    if (popover.visible === false && oldTime !== new Date(time)) {
      setOldTime(new Date(time));
      announceSelectedDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover.visible]);

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
