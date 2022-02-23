import { useState, useMemo } from 'react';
import { usePopoverState } from '../popover/popover-state.js';

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
  const [autoFocusOnShow, setAutoFocusOnShow] = useState(false);
  const popover = usePopoverState({
    placement,
    ...props
  });
  const state = useMemo(() => ({ ...popover,
    timeout,
    showTimeout,
    hideTimeout,
    autoFocusOnShow,
    setAutoFocusOnShow
  }), [popover, timeout, showTimeout, hideTimeout, autoFocusOnShow, setAutoFocusOnShow]);
  return state;
}

export { useHovercardState };
