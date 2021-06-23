import * as React from "react";
import { useCompositeState } from "reakit";
import { ValueBase } from "@react-types/shared";

import { useControllableState } from "../utils";
import { getSelectedValueFromDate, getSelectedDateFromValue } from "./helpers";

export type ColumnType = "hour" | "minute" | "meridian";

export interface TimePickerColumnInitialState extends ValueBase<Date> {
  /**
   * Popover visible state
   */
  visible?: boolean;
  /**
   * TimePicker column type
   *
   * @default "hour"
   */
  columnType?: ColumnType;
}

export const useTimePickerColumnState = (
  props: TimePickerColumnInitialState = {},
) => {
  const {
    defaultValue = new Date(),
    value,
    onChange,
    visible,
    columnType = "hour",
  } = props;

  const [date, setDate] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const selected = getSelectedValueFromDate(date, columnType);

  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  const [count, setCount] = React.useState(selected);

  // keep in sync
  React.useEffect(() => {
    if (!visible) {
      setCount(selected);
    }
  }, [selected, visible]);

  const setSelected = React.useCallback(
    (value: number) => {
      setDate(getSelectedDateFromValue(value, date, columnType));
    },
    [columnType, date, setDate],
  );

  const comp = {
    ...composite,
    up: (args: boolean) => {
      composite.up(args);
      setCount(prev => {
        let count = prev - 1;
        if (count < 0) {
          count = composite.unstable_idCountRef.current - 1;
        }
        return count;
      });
    },
    down: (args: boolean) => {
      composite.down(args);
      setCount(prev => {
        let count = prev + 1;
        if (count > composite.unstable_idCountRef.current) {
          switch (columnType) {
            case "hour":
              count = 1;
              break;
            case "minute":
              count = 0;
              break;
            case "meridian":
              count = 0;
          }
        }
        return count;
      });
    },
  };

  // if count is incrementing while the popover is not visible,
  // (ie: when users are using the segment control to increase the date)
  // then also set the currentId of composite to the corret count index,
  // so that when user opens the popover later it does not cause any syncing issues.
  React.useEffect(() => {
    const id = count;
    composite.setCurrentId(
      composite.currentId?.replace(/-\d+$/, `-${id}`) as string,
    );
  }, [count, visible]);

  React.useEffect(() => {
    console.log("Called 2");

    setSelected(count);
  }, [count]);

  return {
    selected,
    setSelected,
    visible,
    columnType,
    ...comp,
  };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
