'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var popover_popoverState = require('../popover/popover-state.js');
var __utils = require('../__utils-04c64183.js');

const globalState = __utils.createGlobalTooltipState();
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
  const ref = react.useRef();
  const showTimeout = react.useRef();
  const hideTimeout = react.useRef();
  const clearTimeouts = react.useCallback(() => {
    window.clearTimeout(showTimeout.current);
    window.clearTimeout(hideTimeout.current);
  }, []);
  const [_visible, __setVisible] = react.useState((_props$defaultVisible = props.defaultVisible) != null ? _props$defaultVisible : false);

  const _setVisible = nextVisible => {
    props.setVisible == null ? void 0 : props.setVisible(nextVisible);

    if (props.visible === undefined) {
      __setVisible(nextVisible);
    }
  };

  const [visible, setVisible] = hooks.useControlledState((_props$defaultVisible2 = props.defaultVisible) != null ? _props$defaultVisible2 : false, (_props$visible = props.visible) != null ? _props$visible : _visible, nextVisible => {
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
  const popover = popover_popoverState.usePopoverState({
    placement,
    gutter,
    ...props,
    visible,
    setVisible
  });
  react.useEffect(() => {
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
  react.useEffect(() => () => {
    clearTimeouts();
    globalState.hide(ref);
  }, [clearTimeouts]);
  const state = react.useMemo(() => ({ ...popover,
    timeout
  }), [popover, timeout]);
  return state;
}

exports.useTooltipState = useTooltipState;
