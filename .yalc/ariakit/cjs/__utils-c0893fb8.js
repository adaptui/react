'use strict';

var react = require('react');
var store = require('ariakit-utils/store');

const ComboboxContext = store.createStoreContext();
const ComboboxItemValueContext = /*#__PURE__*/react.createContext(undefined);

exports.ComboboxContext = ComboboxContext;
exports.ComboboxItemValueContext = ComboboxItemValueContext;
