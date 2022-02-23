'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Empty function.
 */
function noop() {}
/**
 * Compares two objects.
 * @example
 * shallowEqual({ a: "a" }, {}); // false
 * shallowEqual({ a: "a" }, { b: "b" }); // false
 * shallowEqual({ a: "a" }, { a: "a" }); // true
 * shallowEqual({ a: "a" }, { a: "a", b: "b" }); // false
 */

function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a) return false;
  if (!b) return false;
  if (typeof a !== "object") return false;
  if (typeof b !== "object") return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const {
    length
  } = aKeys;
  if (bKeys.length !== length) return false;

  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
/**
 * Receives a `setState` argument and calls it with `currentValue` if it's a
 * function. Otherwise return the argument as the new value.
 * @example
 * applyState((value) => value + 1, 1); // 2
 * applyState(2, 1); // 2
 */

function applyState(argument, currentValue) {
  if (isUpdater(argument)) {
    const value = isLazyValue(currentValue) ? currentValue() : currentValue;
    return argument(value);
  }

  return argument;
}

function isUpdater(argument) {
  return typeof argument === "function";
}

function isLazyValue(value) {
  return typeof value === "function";
}
/**
 * Sets both a function and object React ref.
 */


function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
/**
 * Checks whether `arg` is an object or not.
 * @returns {boolean}
 */

function isObject(arg) {
  return typeof arg === "object" && arg != null;
}
/**
 * Checks whether `arg` is empty or not.
 * @example
 * isEmpty([]); // true
 * isEmpty(["a"]); // false
 * isEmpty({}); // true
 * isEmpty({ a: "a" }); // false
 * isEmpty(); // true
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(""); // true
 */

function isEmpty(arg) {
  if (Array.isArray(arg)) return !arg.length;
  if (isObject(arg)) return !Object.keys(arg).length;
  if (arg == null) return true;
  if (arg === "") return true;
  return false;
}
/**
 * Checks whether `arg` is a promise or not.
 * @returns {boolean}
 */

function isPromise(arg) {
  return Boolean(arg && "then" in arg && typeof arg.then === "function");
}
/**
 * Checks whether `arg` is an integer or not.
 * @example
 * isInteger(1); // true
 * isInteger(1.5); // false
 * isInteger("1"); // true
 * isInteger("1.5"); // false
 */

function isInteger(arg) {
  if (typeof arg === "number") {
    return Math.floor(arg) === arg;
  }

  return String(Math.floor(Number(arg))) === arg;
}
/**
 * Checks whether `prop` is an own property of `obj` or not.
 */

function hasOwnProperty(object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop);
}
/**
 * Receives functions as arguments and returns a new function that calls all.
 */

function chain() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (const fn of fns) {
      if (typeof fn === "function") {
        // @ts-ignore
        fn(...arguments);
      }
    }
  };
}
/**
 * Returns a string with the truthy values of `args` separated by space.
 */

function cx() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.filter(Boolean).join(" ") || undefined;
}
/**
 * Removes diatrics from a string.
 * TODO: Check if it works on WebView Android.
 */

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
/**
 * Queues a function to be called at the end of the current event loop.
 */

function queueMicrotask(callback) {
  if (window.queueMicrotask) {
    return window.queueMicrotask(callback);
  }

  Promise.resolve().then(callback);
}

exports.applyState = applyState;
exports.chain = chain;
exports.cx = cx;
exports.hasOwnProperty = hasOwnProperty;
exports.isEmpty = isEmpty;
exports.isInteger = isInteger;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.noop = noop;
exports.normalizeString = normalizeString;
exports.queueMicrotask = queueMicrotask;
exports.setRef = setRef;
exports.shallowEqual = shallowEqual;
