import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { useControlledState } from 'ariakit-utils/hooks';
import { usePopoverState } from '../popover/popover-state.js';
import { c as createGlobalTooltipState } from '../__utils-30a60887.js';

const globalState = createGlobalTooltipState();
/**
 * Provides state for the `Tooltip` components.
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>Tooltip</Tooltip>
 * ```
 */

function useTooltipState(_temp) {
  var _props$defaultVisible, _props$defaultVisible2, _props$visible;

  let {
    placement = "top",
    timeout = 0,
    gutter = 8,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const ref = useRef();
  const showTimeout = useRef();
  const hideTimeout = useRef();
  const clearTimeouts = useCallback(() => {
    window.clearTimeout(showTimeout.current);
    window.clearTimeout(hideTimeout.current);
  }, []);
  const [_visible, __setVisible] = useState((_props$defaultVisible = props.defaultVisible) != null ? _props$defaultVisible : false);

  const _setVisible = nextVisible => {
    props.setVisible == null ? void 0 : props.setVisible(nextVisible);

    if (props.visible === undefined) {
      __setVisible(nextVisible);
    }
  };

  const [visible, setVisible] = useControlledState((_props$defaultVisible2 = props.defaultVisible) != null ? _props$defaultVisible2 : false, (_props$visible = props.visible) != null ? _props$visible : _visible, nextVisible => {
    clearTimeouts();

    if (nextVisible) {
      if (!timeout || globalState.activeRef) {
        // If there's no timeout or a tooltip visible already, we can show
        // this immediately.
        globalState.show(ref);
      } else {
        // There may be a reference with focus whose tooltip is still not
        // visible In this case, we want to update it before it gets shown.
        globalState.show(null); // Wait for the timeout to show the tooltip.

        showTimeout.current = window.setTimeout(() => {
          globalState.show(ref);

          _setVisible(nextVisible);
        }, timeout);
        return;
      }
    } else {
      // Let's give some time so people can move from a reference to
      // another and still show tooltips immediately.
      hideTimeout.current = window.setTimeout(() => {
        globalState.hide(ref);
      }, timeout);
    }

    _setVisible(nextVisible);
  });
  const popover = usePopoverState({
    placement,
    gutter,
    ...props,
    visible,
    setVisible
  });
  useEffect(() => {
    return globalState.subscribe(activeRef => {
      if (activeRef !== ref) {
        clearTimeouts();

        if (popover.visible) {
          // Make sure there will be only one tooltip visible
          popover.hide();
        }
      }
    });
  }, [clearTimeouts, popover.visible, popover.hide]);
  useEffect(() => () => {
    clearTimeouts();
    globalState.hide(ref);
  }, [clearTimeouts]);
  const state = useMemo(() => ({ ...popover,
    timeout
  }), [popover, timeout]);
  return state;
}

export { useTooltipState };
