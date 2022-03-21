'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeHover = require('../composite/composite-hover.js');
var composite_compositeItem = require('../composite/composite-item.js');
var __utils = require('../__utils-6be0b335.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const undo = useMenuItem({ state });
 * const redo = useMenuItem({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Menu state={state}>
 *   <Role {...undo}>Undo</Role>
 *   <Role {...redo}>Redo</Role>
 * </Menu>
 * ```
 */
const useMenuItem = system.createHook(_ref => {
  let {
    state,
    hideOnClick = true,
    preventScrollOnKeyDown = true,
    focusOnHover,
    ...props
  } = _ref;
  // Use MenuBar state as a fallback.
  const menuBarState = store.useStore(state || __utils.MenuBarContext, ["items"]);
  state = store.useStore(state || __utils.MenuContext, ["move", "hideAll"]) || menuBarState;
  const onClickProp = hooks.useEventCallback(props.onClick);
  const hideOnClickProp = hooks.useBooleanEventCallback(hideOnClick);
  const hideMenu = state && "hideAll" in state ? state.hideAll : undefined;
  const isWithinMenu = !!hideMenu;
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (!hideMenu) return; // If this item is also a menu button, we don't want to hide the menu.

    const popupType = event.currentTarget.getAttribute("aria-haspopup");
    if (popupType === "menu") return;
    if (!hideOnClickProp(event)) return;
    hideMenu();
  }, [onClickProp, hideMenu, hideOnClickProp]);
  props = {
    role: "menuitem",
    ...props,
    onClick
  };
  props = composite_compositeItem.useCompositeItem({
    state,
    preventScrollOnKeyDown,
    ...props
  });
  props = composite_compositeHover.useCompositeHover({
    state,
    ...props,
    focusOnHover: event => {
      var _state;

      if (typeof focusOnHover === "function") return focusOnHover(event);
      if (focusOnHover != null) return focusOnHover; // The menu container should be focused on mouseleave only if the menu
      // item is inside a menu, not a menu bar.

      if (event.type === "mouseleave") return isWithinMenu;

      if (isWithinMenu) {
        // If the menu item is also a submenu button, we should move actual
        // DOM focus to it so that the submenu will not close when the user
        // moves the cursor back to the menu button.
        if (event.currentTarget.hasAttribute("aria-expanded")) {
          event.currentTarget.focus();
        }

        return true;
      } // If the menu item is inside a menu bar, we should move DOM focus to
      // the menu item if there's another expanded menu button inside the menu
      // bar. Without this, the visible menus in the menu bar wouldn't close.
      else if (__utils.hasExpandedMenuButton((_state = state) == null ? void 0 : _state.items, event.currentTarget)) {
        event.currentTarget.focus();
        return true;
      }

      return false;
    }
  });
  return props;
});
/**
 * A component that renders a menu item.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */

const MenuItem = store.createMemoComponent(props => {
  const htmlProps = useMenuItem(props);
  return system.createElement("div", htmlProps);
});

exports.MenuItem = MenuItem;
exports.useMenuItem = useMenuItem;
