/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { useCompositeState } from "reakit";
import { useTimePickerColumnState } from "./TimePickerColumnState";

export interface TimePickerStateProps {
  onChange?: (v: Date | null) => void;
  value?: string;
}

export const useTimePickerState = ({
  onChange,
  value = "0:00",
}: TimePickerStateProps = {}) => {
  const [time, setTime] = React.useState<Date | null>(parseTime(value));

  React.useEffect(() => {
    onChange?.(time);
  }, [onChange, time]);

  const hourState = useTimePickerColumnState({
    value: time!.getHours() % 12,
    onChange: v => {
      const d = new Date(time?.toISOString() as string);
      d.setHours(v as number);
      setTime(d);
    },
  });

  const minuteState = useTimePickerColumnState({
    value: time?.getMinutes(),
    onChange: v => {
      const d = new Date(time?.toISOString() as string);
      d.setMinutes(v as number);
      setTime(d);
    },
  });

  const meridiesState = useTimePickerColumnState({
    value: time?.toLocaleTimeString().slice(-2).toUpperCase(),
    onChange: v => {
      const d = new Date(time?.toISOString() as string);
      const hour = d.getHours() % 12;

      if (v === "AM") {
        d.setHours(hour);
      } else {
        d.setHours(hour + 12);
      }
      setTime(d);
    },
  });

  const composite = useCompositeState({ orientation: "horizontal" });

  const hours = [...new Array(13).keys()].slice(1);
  const minutes = [...new Array(60).keys()];
  const meridies = ["AM", "PM"];
  return {
    hours,
    minutes,
    meridies,
    hourState,
    minuteState,
    meridiesState,
    ...composite,
  };
};

export type TimePickerStateReturn = ReturnType<typeof useTimePickerState>;

function parseTime(timeString: string) {
  if (!timeString || timeString == "") return null;

  const time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
  if (time == null) return null;

  let hours = parseInt(time[1], 10);
  if (hours == 12 && !time[4]) {
    hours = 0;
  } else {
    hours += hours < 12 && time[4] ? 12 : 0;
  }
  const d = new Date();
  d.setHours(hours);
  d.setMinutes(parseInt(time[3], 10) || 0);
  d.setSeconds(0, 0);
  return d;
}
