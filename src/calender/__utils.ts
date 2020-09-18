import {
  getDaysInMonth,
  startOfMonth,
  getDay,
  endOfMonth,
  setDate,
  addMonths,
} from "date-fns";

export type Group = {
  id: string;
  ref: React.RefObject<HTMLElement>;
};

export type Item = {
  id: string | null;
  ref: React.RefObject<HTMLElement>;
  groupId?: Group["id"];
  disabled?: boolean;
};

export type Orientation = "horizontal" | "vertical";

export const chunk = function (array: any[], size: number): any[] {
  const results = [];
  while (array.length) results.push(array.splice(0, size));
  return results;
};

export const generateMonths = (
  selectedDate: Date,
): [{ date: Date; type: string }][] => {
  const daysInMonth = getDaysInMonth(selectedDate);
  const startWeekDays = getDay(startOfMonth(selectedDate));
  const endWeekDays = getDay(endOfMonth(selectedDate));

  const grid = chunk(
    [
      ...Array.from({ length: startWeekDays }, (_, i) => ({
        date: setDate(selectedDate, -i),
        type: "disabled",
      })).reverse(),
      ...Array.from({ length: daysInMonth }, (_, i) => ({
        date: setDate(selectedDate, i + 1),
        type: "current",
      })),
      ...Array.from({ length: 6 - endWeekDays }, (_, i) => ({
        date: setDate(addMonths(selectedDate, 1), i + 1),
        type: "disabled",
      })),
    ],
    7,
  );

  return grid;
};

export function reverse<T>(array: T[]): T[] {
  return array.slice().reverse();
}

export function groupItems(items: Item[]) {
  const groups = [[]] as Item[][];

  for (const item of items) {
    const group = groups.find(g => !g[0] || g[0].groupId === item.groupId);
    if (group) {
      group.push(item);
    } else {
      groups.push([item]);
    }
  }

  return groups;
}

export function flatten<T>(grid: T[][]) {
  const flattened = [] as T[];
  for (const row of grid) {
    flattened.push(...row);
  }
  return flattened;
}

export function getMaxLength(rows: Item[][]) {
  let maxLength = 0;
  for (const { length } of rows) {
    if (length > maxLength) {
      maxLength = length;
    }
  }
  return maxLength;
}

export function findFirstEnabledItem(items: Item[], excludeId?: string) {
  if (excludeId) {
    return items.find(item => !item.disabled && item.id !== excludeId);
  }
  return items.find(item => !item.disabled);
}

export function findLastEnabledItem(items: Item[], excludeId?: string) {
  if (excludeId) {
    return [...items]
      .reverse()
      .find(item => !item.disabled && item.id !== excludeId);
  }
  return [...items].reverse().find(item => !item.disabled);
}

function createEmptyItem(groupId?: string) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    ref: { current: null },
    groupId,
  };
}

/**
 * Turns [[row1, row1], [row2]] into [[row1, row1], [row2, row2]]
 */
export function fillGroups(
  groups: Item[][],
  currentId?: string | null,
  angular?: boolean,
) {
  const maxLength = getMaxLength(groups);

  for (const group of groups) {
    for (let i = 0; i < maxLength; i += 1) {
      const item = group[i];
      if (!item || (angular && item.disabled)) {
        const isFrist = i === 0;
        const previousItem =
          isFrist && angular ? findFirstEnabledItem(group) : group[i - 1];
        group[i] =
          previousItem && currentId !== previousItem?.id && angular
            ? previousItem
            : createEmptyItem(previousItem?.groupId);
      }
    }
  }

  return groups;
}

/**
 * Turns [row1, row1, row2, row2] into [row1, row2, row1, row2]
 */
export function verticalizeItems(items: Item[]) {
  const groups = groupItems(items);
  const maxLength = getMaxLength(groups);
  const verticalized = [] as Item[];

  for (let i = 0; i < maxLength; i += 1) {
    for (const group of groups) {
      if (group[i]) {
        verticalized.push({
          ...group[i],
          // If there's no groupId, it means that it's not a grid composite,
          // but a single row instead. So, instead of verticalizing it, that
          // is, assigning a different groupId based on the column index, we
          // keep it undefined so they will be part of the same group.
          // It's useful when using up/down on one-dimensional composites.
          groupId: group[i].groupId ? `${i}` : undefined,
        });
      }
    }
  }

  return verticalized;
}

export function findEnabledItemById(items: Item[], id?: string | null) {
  if (!id) return undefined;
  return items?.find(item => item.id === id && !item.disabled);
}

export function getItemsInGroup(items: Item[], groupId?: string) {
  return items.filter(item => item.groupId === groupId);
}
