/**
 * Transforms `arg` into an array if it's not already.
 * @example
 * toArray("a"); // ["a"]
 * toArray(["a"]); // ["a"]
 */
function toArray(arg) {
  if (Array.isArray(arg)) {
    return arg;
  }

  return typeof arg !== "undefined" ? [arg] : [];
}
/**
 * Immutably adds an index to an array.
 * @example
 * addItemToArray(["a", "b", "d"], "c", 2); // ["a", "b", "c", "d"]
 * @returns {Array} A new array with the item in the passed array index.
 */

function addItemToArray(array, item, index) {
  if (index === void 0) {
    index = -1;
  }

  if (!(index in array)) {
    return [...array, item];
  }

  return [...array.slice(0, index), item, ...array.slice(index)];
}
/**
 * Flattens a 2D array into a one-dimensional array.
 * @example
 * flatten2DArray([["a"], ["b"], ["c"]]); // ["a", "b", "c"]
 *
 * @returns {Array} A one-dimensional array.
 */

function flatten2DArray(array) {
  const flattened = [];

  for (const row of array) {
    flattened.push(...row);
  }

  return flattened;
}
/**
 * Immutably reverses an array.
 * @example
 * reverseArray(["a", "b", "c"]); // ["c", "b", "a"]
 * @returns {Array} Reversed array.
 */

function reverseArray(array) {
  return array.slice().reverse();
}

export { addItemToArray, flatten2DArray, reverseArray, toArray };
