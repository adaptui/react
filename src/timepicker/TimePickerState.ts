import * as React from "react";
import { ValueBase } from "@react-types/shared";

import { useControllableState } from "../utils";
import { stringifyTime, parseTime } from "./helpers";
import { SegmentInitialState, useSegmentState } from "../segment";
import { useTimePickerColumnState } from "./TimePickerColumnState";
import { PickerBaseInitialState, usePickerBaseState } from "../picker-base";

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

  const oldTime = React.useRef(time);
  console.log("%c Actual oldTime", "color: #5200cc", oldTime.current);

  const updateOldTime = React.useCallback(time => {
    console.log("%c Time to be update as oldTime", "color: #ff6600", time);
    oldTime.current = time;
  }, []);

  const restoreOldTime = React.useCallback(
    time => {
      console.log("%c Time to be restored", "color: #607339", time);
      setTime(time);
    },
    [setTime],
  );

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
    oldTime,
    updateOldTime,
    restoreOldTime,
  });

  const minuteState = useTimePickerColumnState({
    columnType: "minute",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
    popover,
    oldTime,
    updateOldTime,
    restoreOldTime,
  });

  const meridiesState = useTimePickerColumnState({
    columnType: "meridian",
    value: time,
    onChange: setTimeProp,
    visible: popover.visible,
    popover,
    oldTime,
    updateOldTime,
    restoreOldTime,
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

  // Some Weird React Bug
  React.useEffect(() => {
    if (popover.visible === false && oldTime.current !== time) {
      console.log(
        "%c Segment Effect time",
        "color: #eeff00",
        segmentState.fieldValue,
      );
      console.log("%c Current Effect time", "color: #ffa280", time);
      updateOldTime(time);
    }
  }, [popover.visible, updateOldTime, time, segmentState.fieldValue]);

  // Solution
  React.useEffect(() => {
    if (
      popover.visible === false &&
      oldTime.current !== segmentState.fieldValue
    ) {
      console.log("%c fieldValue", "color: #eeff00", segmentState.fieldValue);
      updateOldTime(segmentState.fieldValue);
    }
  }, [popover.visible, updateOldTime, segmentState.fieldValue]);

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
