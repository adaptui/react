'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var popover_popoverState = require('../popover/popover-state.js');

/**
 * Provides state for the `Hovercard` components.
 * @example
 * ```jsx
 * const hovercard = useHovercardState({ placement: "top" });
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */

function useHovercardState(_temp) {
  let {
    timeout = 500,
    placement = "bottom",
    showTimeout = timeout,
    hideTimeout = timeout,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [autoFocusOnShow, setAutoFocusOnShow] = react.useState(false);
  const popover = popover_popoverState.usePopoverState({
    placement,
    ...props
  });
  const state = react.useMemo(() => ({ ...popover,
    timeout,
    showTimeout,
    hideTimeout,
    autoFocusOnShow,
    setAutoFocusOnShow
  }), [popover, timeout, showTimeout, hideTimeout, autoFocusOnShow, setAutoFocusOnShow]);
  return state;
}

exports.useHovercardState = useHovercardState;
