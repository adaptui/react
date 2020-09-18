/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useCompositeState } from "reakit";
import { flatten } from "reakit-utils";
import {
  addYears,
  subYears,
  subMonths,
  addMonths,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import {
  reverse,
  groupItems,
  fillGroups,
  generateMonths,
  verticalizeItems,
  findLastEnabledItem,
  findEnabledItemById,
  findFirstEnabledItem,
} from "./__utils";
import { Group, Item } from "reakit/ts/Composite/__utils/types";

export const weeksDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

interface CalenderInitialState {
  from?: Date;
}

export const useCalenderState = ({
  from = new Date(),
}: CalenderInitialState = {}) => {
  const [selectedDate, setSelectedDate] = React.useState(from);
  const [startDate, setStartDate] = React.useState(new Date());

  // previous column is used to track the keyboard navigation
  const [previousColumn, setPreviousColumn] = React.useState<{
    index?: number;
    direction?: string;
  }>({});

  const composite = useCompositeState({
    unstable_virtual: true,
    wrap: true,
  });

  const previousYear = () => {
    const year = subYears(startDate, 1);
    setStartDate(startOfMonth(year));
  };
  const nextYear = () => {
    const year = addYears(startDate, 1);
    setStartDate(startOfMonth(year));
  };

  const previousMonth = React.useCallback(() => {
    const month = subMonths(startDate, 1);
    setStartDate(startOfWeek(month));
  }, [startDate]);

  const nextMonth = React.useCallback(() => {
    const month = addMonths(startDate, 1);
    setStartDate(startOfWeek(month));
  }, [startDate]);

  const weeks = generateMonths(startDate);

  const moveToUpOrDown = React.useCallback(() => {
    // get the vertical items
    const verticalItems = verticalizeItems(
      // @ts-ignore
      reverse(
        flatten(fillGroups(groupItems(composite.items), composite.currentId)),
      ),
    );

    // get the current cell
    const cell = findEnabledItemById(verticalItems, composite.currentId);
    // get the current cell index
    const cellIndex = verticalItems.indexOf(cell as any);

    // no we need the information about which row we are on
    // firstly find the compositeItem, we cannot use "cell" because `verticalizeItems` changes the groupId :(
    const compositeItem = composite.items.find(i => i.id === cell?.id);
    // now we know the group index
    const group = composite.groups.find(g => g.id === compositeItem?.groupId);
    const groupIndex = composite.groups.indexOf(group as any);

    return { verticalItems, cellIndex, groupIndex, group, compositeItem };
  }, [composite.currentId, composite.groups, composite.items]);

  const setPreviousColumnIndex = (
    group?: Group,
    compositeItem?: Item,
    direction?: string,
  ) => {
    const columnIndex = Array.from(
      group?.ref.current?.children as HTMLCollection,
    ).indexOf(compositeItem?.ref?.current as HTMLElement);

    setPreviousColumn({
      index: columnIndex,
      direction,
    });
  };

  const up = React.useCallback(() => {
    console.log("up");
    const {
      group,
      cellIndex,
      groupIndex,
      compositeItem,
      verticalItems,
    } = moveToUpOrDown();

    if (verticalItems[cellIndex + 1]?.disabled || groupIndex === 0) {
      previousMonth();
      setPreviousColumnIndex(group, compositeItem, "UP");
    } else {
      composite.up();
    }
  }, [composite, moveToUpOrDown, previousMonth, composite.currentId]);

  const down = React.useCallback(() => {
    console.log("down");
    const {
      group,
      cellIndex,
      groupIndex,
      compositeItem,
      verticalItems,
    } = moveToUpOrDown();

    // try to find the next item in the vertical list and check if its disabled
    // or check if we are on the last row
    // then jump to next month
    if (
      verticalItems[cellIndex - 1]?.disabled ||
      groupIndex === composite.groups.length - 1
    ) {
      nextMonth();
      setPreviousColumnIndex(group, compositeItem, "DOWN");
    } else {
      composite.down();
    }
  }, [moveToUpOrDown, nextMonth, composite, composite.groups.length]);

  const next = React.useCallback(() => {
    console.log("next");
    // get the current cell
    const cell = findEnabledItemById(composite.items, composite.currentId);

    // get the first item which is enabled
    const lastItem = findLastEnabledItem(composite.items);

    // if current cell id matches the last enabled item's id then we know it's the end.
    // then go to next month
    if (cell?.id === lastItem?.id) {
      nextMonth();
    } else {
      composite.next();
    }
  }, [composite, nextMonth, composite.currentId]);

  const previous = React.useCallback(() => {
    console.log("previous");
    const cell = findEnabledItemById(composite.items, composite.currentId);
    const firstItem = findFirstEnabledItem(composite.items);

    if (cell?.id === firstItem?.id) {
      previousMonth();
    } else {
      composite.previous();
    }
  }, [composite, previousMonth, composite.currentId]);

  /*
    Retain previous index and start from there

    What it does?
    It wraps the cell focus to the same column which was previously set.
   */
  React.useEffect(() => {
    if (composite.groups && previousColumn.index) {
      let i = previousColumn.direction === "UP" ? composite.items.length : 0;
      let cell = null;

      while (!cell) {
        // find the cell corresponding to the previous column
        const foundCell =
          composite.groups[i]?.ref?.current?.children[previousColumn.index];

        // check if cell is disabled & set the cell
        if ((foundCell as any)?.getAttribute("aria-disabled") !== "true") {
          cell = foundCell;
        }

        previousColumn.direction === "UP" ? i-- : i++;
      }

      // move the focus to the cell we found
      composite.move(cell?.id);
    }
  }, [previousColumn, composite.groups]);

  return {
    ...composite,
    up,
    down,
    next,
    previous,
    weeksDays,
    weeks,
    previousMonth,
    previousYear,
    nextMonth,
    nextYear,
    selectedDate,
    setSelectedDate,
    startDate,
  };
};

export type CalenderStateReturn = ReturnType<typeof useCalenderState>;
