'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-c8a939b6.js');
var jsxRuntime = require('react/jsx-runtime');

const useGroup = system.createHook(props => {
  const [labelId, setLabelId] = react.useState();
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.GroupLabelContext.Provider, {
    value: setLabelId,
    children: element
  }), []);
  props = {
    role: "group",
    "aria-labelledby": labelId,
    ...props
  };
  return props;
});
/**
 * A component that renders a group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * <Group>Group</Group>
 * ```
 */

const Group = system.createComponent(props => {
  const htmlProps = useGroup(props);
  return system.createElement("div", htmlProps);
});

exports.Group = Group;
exports.useGroup = useGroup;
