'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var jsxRuntime = require('react/jsx-runtime');
var button_button = require('../button/button.js');

const children = /*#__PURE__*/jsxRuntime.jsxs("svg", {
  "aria-hidden": "true",
  display: "block",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1pt",
  width: "1em",
  height: "1em",
  pointerEvents: "none",
  children: [/*#__PURE__*/jsxRuntime.jsx("line", {
    x1: "5",
    y1: "5",
    x2: "11",
    y2: "11"
  }), /*#__PURE__*/jsxRuntime.jsx("line", {
    x1: "5",
    y1: "11",
    x2: "11",
    y2: "5"
  })]
});
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox cancel button that clears the combobox
 * input when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxCancel({ state });
 * <Combobox state={state} />
 * <Role {...props} />
 * ```
 */


const useComboboxCancel = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    state.setValue(""); // Move focus to the combobox input.

    state.move(null);
  }, [onClickProp, state.setValue, state.move]);
  const comboboxId = hooks.useRefId(state.baseRef);
  props = {
    children,
    "aria-label": "Clear input",
    // This aria-controls will ensure the combobox popup remains visible when
    // this element gets focused. This logic is done in the ComboboxPopover
    // component.
    "aria-controls": comboboxId,
    ...props,
    onClick
  };
  props = button_button.useButton(props);
  return props;
});
/**
 * A component that renders a combobox cancel button that clears the combobox
 * input when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxCancel state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */

const ComboboxCancel = system.createComponent(props => {
  const htmlProps = useComboboxCancel(props);
  return system.createElement("button", htmlProps);
});

exports.ComboboxCancel = ComboboxCancel;
exports.useComboboxCancel = useComboboxCancel;
