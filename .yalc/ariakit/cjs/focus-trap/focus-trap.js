'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var visuallyHidden_visuallyHidden = require('../visually-hidden/visually-hidden.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a focus trap element.
 * @see https://ariakit.org/components/focus-trap
 * @example
 * ```jsx
 * const props = useFocusTrap();
 * <Role {...props} />
 * ```
 */

const useFocusTrap = system.createHook(props => {
  props = {
    "data-focus-trap": "",
    tabIndex: 0,
    "aria-hidden": true,
    ...props,
    style: {
      // Prevents unintended scroll jumps.
      position: "fixed",
      top: 0,
      left: 0,
      ...props.style
    }
  };
  props = visuallyHidden_visuallyHidden.useVisuallyHidden(props);
  return props;
});
/**
 * A component that renders a focus trap element.
 * @see https://ariakit.org/components/focus-trap
 * @example
 * ```jsx
 * <FocusTrap onFocus={focusSomethingElse} />
 * ```
 */

const FocusTrap = system.createComponent(props => {
  const htmlProps = useFocusTrap(props);
  return system.createElement("span", htmlProps);
});

exports.FocusTrap = FocusTrap;
exports.useFocusTrap = useFocusTrap;
