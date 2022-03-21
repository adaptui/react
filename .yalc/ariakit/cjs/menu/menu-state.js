'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');
var composite_compositeState = require('../composite/composite-state.js');
var hovercard_hovercardState = require('../hovercard/hovercard-state.js');
var __utils = require('../__utils-6be0b335.js');

/**
 * Provides state for the `Menu` components.
 * @example
 * ```jsx
 * const menu = useMenuState({ placement: "top" });
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
function useMenuState(_temp) {
  var _timeout;

  let {
    orientation = "vertical",
    timeout,
    hideTimeout = 0,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [initialFocus, setInitialFocus] = react.useState("container");
  const [values, setValues] = hooks.useControlledState(props.defaultValues || {}, props.values, props.setValues);
  const parentMenu = store.useStore(__utils.MenuContext, ["orientation", "hideAll"]);
  const parentMenuBar = store.useStore(__utils.MenuBarContext, ["orientation"]);
  const contextOrientation = (parentMenu == null ? void 0 : parentMenu.orientation) || (parentMenuBar == null ? void 0 : parentMenuBar.orientation);
  const parentIsMenuBar = !!parentMenuBar && !parentMenu; // Defines the placement of the menu popover based on the parent orientation.

  const placement = props.placement || (contextOrientation === "vertical" ? "right-start" : "bottom-start");
  timeout = ((_timeout = timeout) != null ? _timeout : parentIsMenuBar) ? 0 : 150;
  const composite = composite_compositeState.useCompositeState({
    orientation,
    ...props
  });
  const hovercard = hovercard_hovercardState.useHovercardState({
    timeout,
    hideTimeout,
    ...props,
    placement
  });
  const setValue = react.useCallback((name, value) => {
    // Preventing prototype pollution.
    if (name === "__proto__" || name === "constructor") return;
    setValues(prevValues => {
      const prevValue = prevValues[name];
      const nextValue = misc.applyState(value, prevValue);

      if (nextValue === prevValue) {
        return prevValues;
      }

      return { ...prevValues,
        [name]: nextValue === undefined ? !!nextValue : nextValue
      };
    });
  }, [setValues]);
  const hideAll = react.useCallback(() => {
    hovercard.hide();
    parentMenu == null ? void 0 : parentMenu.hideAll();
  }, [hovercard.hide, parentMenu == null ? void 0 : parentMenu.hideAll]);
  const state = react.useMemo(() => ({ ...composite,
    ...hovercard,
    initialFocus,
    setInitialFocus,
    values,
    setValues,
    setValue,
    hideAll
  }), [composite, hovercard, initialFocus, setInitialFocus, values, setValues, setValue, hideAll]);
  return store.useStorePublisher(state);
}

exports.useMenuState = useMenuState;
