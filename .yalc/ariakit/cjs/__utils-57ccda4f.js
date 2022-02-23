'use strict';

var react = require('react');
var dom = require('ariakit-utils/dom');
var store = require('ariakit-utils/store');

const NULL_ITEM = {
  id: null,
  ref: {
    current: null
  }
};

function getMaxRowLength(array) {
  let maxLength = 0;

  for (const {
    length
  } of array) {
    if (length > maxLength) {
      maxLength = length;
    }
  }

  return maxLength;
}
/**
 * Returns only enabled items.
 */


function getEnabledItems(items, excludeId) {
  return items.filter(item => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }

    return !item.disabled;
  });
}
/**
 * Finds the first enabled item.
 */

function findFirstEnabledItem(items, excludeId) {
  return items.find(item => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }

    return !item.disabled;
  });
}
/**
 * Fills rows with fewer items with empty items so they all have the same
 * length.
 */

function normalizeRows(rows, activeId, focusShift) {
  const maxLength = getMaxRowLength(rows);

  for (const row of rows) {
    for (let i = 0; i < maxLength; i += 1) {
      const item = row[i];

      if (!item || focusShift && item.disabled) {
        const isFirst = i === 0;
        const previousItem = isFirst && focusShift ? findFirstEnabledItem(row) : row[i - 1];
        row[i] = previousItem && activeId !== previousItem.id && focusShift ? previousItem : createEmptyItem(previousItem == null ? void 0 : previousItem.rowId);
      }
    }
  }

  return rows;
}

function createEmptyItem(rowId) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    ref: {
      current: null
    },
    rowId
  };
}
/**
 * Finds the first enabled item by its id.
 */


function findEnabledItemById(items, id) {
  if (!id) return;
  return items.find(item => item.id === id && !item.disabled);
}
/**
 * Gets the active id. If `passedId` is provided, it's going to take
 * precedence.
 */

function getActiveId(items, activeId, passedId) {
  var _findFirstEnabledItem;

  if (passedId !== undefined) {
    return passedId;
  }

  if (activeId !== undefined) {
    return activeId;
  }

  return (_findFirstEnabledItem = findFirstEnabledItem(items)) == null ? void 0 : _findFirstEnabledItem.id;
}
/**
 * Gets all items with the passed rowId.
 */

function getItemsInRow(items, rowId) {
  return items.filter(item => item.rowId === rowId);
}
/**
 * Gets the opposite orientation.
 */

function getOppositeOrientation(orientation) {
  if (orientation === "vertical") return "horizontal";
  if (orientation === "horizontal") return "vertical";
  return;
}
/**
 * Creates a two-dimensional array with items grouped by their rowId's.
 */

function groupItemsByRows(items) {
  const rows = [];

  for (const item of items) {
    const row = rows.find(currentRow => {
      var _currentRow$;

      return ((_currentRow$ = currentRow[0]) == null ? void 0 : _currentRow$.rowId) === item.rowId;
    });

    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }

  return rows;
}
/**
 * Moves all the items before the passed `id` to the end of the array. This is
 * useful when we want to loop through the items in the same row or column as
 * the first items will be placed after the last items.
 *
 * The null item that's inserted when `shouldInsertNullItem` is set to `true`
 * represents the composite container itself. When the active item is null, the
 * composite container has focus.
 */

function flipItems(items, activeId, shouldInsertNullItem) {
  if (shouldInsertNullItem === void 0) {
    shouldInsertNullItem = false;
  }

  const index = items.findIndex(item => item.id === activeId);
  return [...items.slice(index + 1), ...(shouldInsertNullItem ? [NULL_ITEM] : []), ...items.slice(0, index)];
}
/**
 * Changes the order of the items list so they are ordered vertically. That is,
 * if the active item is the first item in the first row, the next item will be
 * the first item in the second row, which is what you would expect when moving
 * up/down.
 */

function verticalizeItems(items) {
  const rows = groupItemsByRows(items);
  const maxLength = getMaxRowLength(rows);
  const verticalized = [];

  for (let i = 0; i < maxLength; i += 1) {
    for (const row of rows) {
      const item = row[i];

      if (item) {
        verticalized.push({ ...item,
          // If there's no rowId, it means that it's not a grid composite, but
          // a single row instead. So, instead of verticalizing it, that is,
          // assigning a different rowId based on the column index, we keep it
          // undefined so they will be part of the same row. This is useful
          // when using up/down on one-dimensional composites.
          rowId: item.rowId ? "" + i : undefined
        });
      }
    }
  }

  return verticalized;
}
/**
 * Gets item id.
 */

function getContextId(state, context) {
  return context != null && context.baseRef && context.baseRef === (state == null ? void 0 : state.baseRef) ? context.id : undefined;
}
function selectTextField(element, collapseToEnd) {
  if (collapseToEnd === void 0) {
    collapseToEnd = false;
  }

  if (dom.isTextField(element)) {
    element.setSelectionRange(collapseToEnd ? element.value.length : 0, element.value.length);
  } else if (element.isContentEditable) {
    const selection = dom.getDocument(element).getSelection();
    selection == null ? void 0 : selection.selectAllChildren(element);

    if (collapseToEnd) {
      selection == null ? void 0 : selection.collapseToEnd();
    }
  }
}
const CompositeContext = store.createStoreContext();
const CompositeRowContext = /*#__PURE__*/react.createContext(undefined);
const CompositeItemContext = /*#__PURE__*/react.createContext(undefined);

exports.CompositeContext = CompositeContext;
exports.CompositeItemContext = CompositeItemContext;
exports.CompositeRowContext = CompositeRowContext;
exports.findEnabledItemById = findEnabledItemById;
exports.findFirstEnabledItem = findFirstEnabledItem;
exports.flipItems = flipItems;
exports.getActiveId = getActiveId;
exports.getContextId = getContextId;
exports.getEnabledItems = getEnabledItems;
exports.getItemsInRow = getItemsInRow;
exports.getOppositeOrientation = getOppositeOrientation;
exports.groupItemsByRows = groupItemsByRows;
exports.normalizeRows = normalizeRows;
exports.selectTextField = selectTextField;
exports.verticalizeItems = verticalizeItems;
