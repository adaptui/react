import * as React from "react";
import { useCompositeState } from "reakit";
import { ValueBase } from "@react-types/shared";

import { useControllableState } from "../utils";
import { getSelectedValueFromDate, getSelectedDateFromValue } from "./helpers";
import { PickerBaseStateReturn } from "../picker-base";

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
  popover?: PickerBaseStateReturn;
  oldTime?: any;
  restoreOldTime?(time: any): void;
  updateOldTime?(time: any): void;
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
    popover,
    oldTime,
    updateOldTime,
    restoreOldTime,
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
    (value: number, close?: boolean) => {
      setDate(getSelectedDateFromValue(value, date, columnType));
      close && popover?.hide();
    },
    [columnType, date, popover, setDate],
  );

  const comp = {
    ...composite,
    up: (unstable_allTheWay?: boolean) => {
      composite.up(unstable_allTheWay);
      setCount(prev => {
        let count = prev - 1;
        if (count < 0) {
          count = composite.unstable_idCountRef.current - 1;
        }
        return count;
      });
    },
    down: (unstable_allTheWay?: boolean) => {
      composite.down(unstable_allTheWay);
      setCount(prev => {
        let count = (prev + 1) % composite.unstable_idCountRef.current;
        return count;
      });
    },
  };

  // if count is incrementing while the popover is not visible,
  // (ie: when users are using the segment control to increase the date)
  // then also set the currentId of composite to the corret count index,
  // so that when user opens the popover later it does not cause any syncing issues.
  React.useEffect(() => {
    // add 1 to meridian & minute beause they are zero based index
    const id = count + (columnType === "hour" ? 0 : 1);
    composite.setCurrentId(`${composite.baseId}-${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnType, count, visible]);

  React.useEffect(() => {
    setSelected(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return {
    date,
    setDate,
    oldTime,
    selected,
    setSelected,
    visible,
    columnType,
    restoreOldTime,
    updateOldTime,
    ...comp,
  };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
