'use strict';

var react = require('react');
var store = require('ariakit-utils/store');

const SelectItemCheckedContext = /*#__PURE__*/react.createContext(false);
const SelectContext = store.createStoreContext();
function findFirstEnabledItemWithValue(items) {
  return items.find(item => item.value != null && !item.disabled);
}
function findEnabledItemWithValueById(items, id) {
  return items.find(item => item.value != null && item.id === id && !item.disabled);
}
function findEnabledItemByValue(items, value) {
  return items.find(item => item.value === value && !item.disabled);
}

exports.SelectContext = SelectContext;
exports.SelectItemCheckedContext = SelectItemCheckedContext;
exports.findEnabledItemByValue = findEnabledItemByValue;
exports.findEnabledItemWithValueById = findEnabledItemWithValueById;
exports.findFirstEnabledItemWithValue = findFirstEnabledItemWithValue;
