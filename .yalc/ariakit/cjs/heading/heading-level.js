'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var __utils = require('../__utils-701b405e.js');
var jsxRuntime = require('react/jsx-runtime');

function HeadingLevel(_ref) {
  let {
    level,
    children
  } = _ref;
  const contextLevel = react.useContext(__utils.HeadingContext);
  const nextLevel = Math.max(Math.min(level || contextLevel + 1, 6), 1);
  return /*#__PURE__*/jsxRuntime.jsx(__utils.HeadingContext.Provider, {
    value: nextLevel,
    children: children
  });
}

exports.HeadingLevel = HeadingLevel;
