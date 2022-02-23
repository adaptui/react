'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var store = require('ariakit-utils/store');
var composite_compositeState = require('../composite/composite-state.js');
var hovercard_hovercardState = require('../hovercard/hovercard-state.js');
var __utils = require('../__utils-601a5088.js');

function useParentOrientation(parentMenu) {
  const parentMenuBar = store.useStore(__utils.MenuBarContext, ["orientation"]);

  if (parentMenu) {
    return parentMenu.orientation;
  }

  return parentMenuBar == null ? void 0 : parentMenuBar.orientation;
}
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
  let {
    orientation = "vertical",
    timeout = 150,
    hideTimeout = 0,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [initialFocus, setInitialFocus] = react.useState("container");
  const [values, setValues] = hooks.useControlledState(props.defaultValues || {}, props.values, props.setValues);
  const parentMenu = __utils.useParentMenu(["orientation", "hideAll"]);
  const contextOrientation = useParentOrientation(parentMenu); // Defines the placement of the menu popover based on the parent orientation.

  const placement = props.placement || (contextOrientation === "vertical" ? "right-start" : "bottom-start");
  const composite = composite_compositeState.useCompositeState({
    orientation,
    ...props
  });
  const hoverCard = hovercard_hovercardState.useHovercardState({
    timeout,
    hideTimeout,
    ...props,
    placement
  }); // TODO: Comment. Sometimes re-opening the menu in a menu bar will move focus.
  // Maybe should reset activeId as well. Needs to be layout effect because of
  // context menu subsequent clicks.

  hooks.useSafeLayoutEffect(() => {
    if (!hoverCard.visible) {
      composite.setMoves(0);
    }
  }, [hoverCard.visible, composite.setMoves]);
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
    hoverCard.hide();
    parentMenu == null ? void 0 : parentMenu.hideAll();
  }, [hoverCard.hide, parentMenu == null ? void 0 : parentMenu.hideAll]);
  const state = react.useMemo(() => ({ ...composite,
    ...hoverCard,
    initialFocus,
    setInitialFocus,
    values,
    setValues,
    setValue,
    hideAll
  }), [composite, hoverCard, initialFocus, setInitialFocus, values, setValues, setValue, hideAll]);
  return store.useStorePublisher(state);
}

exports.useMenuState = useMenuState;
