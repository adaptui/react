'use strict';

var react = require('react');

const DialogContext = /*#__PURE__*/react.createContext(undefined);
const DialogHeadingContext = /*#__PURE__*/react.createContext(undefined);
const DialogDescriptionContext = /*#__PURE__*/react.createContext(undefined);

exports.DialogContext = DialogContext;
exports.DialogDescriptionContext = DialogDescriptionContext;
exports.DialogHeadingContext = DialogHeadingContext;
