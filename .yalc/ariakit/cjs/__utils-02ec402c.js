'use strict';

var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');

const FormContext = store.createStoreContext();
function hasMessages(object) {
  return Object.keys(object).some(key => {
    if (misc.isObject(object[key])) {
      return hasMessages(object[key]);
    }

    return !!object[key];
  });
}
function get(values, path, defaultValue) {
  const [key, ...rest] = Array.isArray(path) ? path : ("" + path).split(".");

  if (key == null || !values) {
    return defaultValue;
  }

  if (!rest.length) {
    var _values$key;

    return (_values$key = values[key]) != null ? _values$key : defaultValue;
  }

  return get(values[key], rest, defaultValue);
}
function set(values, path, value) {
  const [k, ...rest] = Array.isArray(path) ? path : ("" + path).split(".");
  if (k == null) return values;
  const key = k;
  const isIntegerKey = misc.isInteger(key);
  const nextValues = isIntegerKey ? values || [] : values || {};
  const result = rest.length ? set(nextValues[key], rest, value) : value;

  if (isIntegerKey) {
    const index = Number(key);

    if (values) {
      return [...values.slice(0, index), result, ...values.slice(index + 1)];
    }

    const nextValues = [];
    nextValues[index] = result;
    return nextValues;
  }

  return { ...values,
    [key]: result
  };
}
function setAll(values, value) {
  const result = {};
  const keys = Object.keys(values);

  for (const key of keys) {
    const currentValue = values[key];

    if (Array.isArray(currentValue)) {
      result[key] = currentValue.map(v => {
        if (misc.isObject(v)) {
          return setAll(v, value);
        }

        return value;
      });
    } else if (misc.isObject(currentValue)) {
      result[key] = setAll(currentValue, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
function createNames() {
  const cache = Object.create(null);
  return new Proxy(Object.create(null), getNameHandler(cache));
}

function getNameHandler(cache, prevKeys) {
  if (prevKeys === void 0) {
    prevKeys = [];
  }

  const handler = {
    get(target, key) {
      if (["toString", "valueOf", Symbol.toPrimitive].includes(key)) {
        return () => prevKeys.join(".");
      }

      const nextKeys = [...prevKeys, key];
      const nextKey = nextKeys.join(".");

      if (cache[nextKey]) {
        return cache[nextKey];
      }

      const nextProxy = new Proxy(target, getNameHandler(cache, nextKeys));
      cache[nextKey] = nextProxy;
      return nextProxy;
    }

  };
  return handler;
}
/**
 * An object or primitive value that can be converted to a string.
 */

exports.FormContext = FormContext;
exports.createNames = createNames;
exports.get = get;
exports.hasMessages = hasMessages;
exports.set = set;
exports.setAll = setAll;
