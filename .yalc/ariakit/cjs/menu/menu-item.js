'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeHover = require('../composite/composite-hover.js');
var composite_compositeItem = require('../composite/composite-item.js');
var __utils = require('../__utils-601a5088.js');

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
    ...props
  } = _ref;
  const context = __utils.MenuContext;
  state = store.useStore(state || context, ["move"]);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const hideOnClickProp = hooks.useBooleanEventCallback(hideOnClick);
  const hideMenu = state && "hideAll" in state ? state.hideAll : undefined;
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (!hideMenu) return; // If this item is also a menu button, we don't want to hide the menu.

    const popupType = event.currentTarget.getAttribute("aria-haspopup");
    if (popupType === "menu") return;
    if (!hideOnClickProp(event)) return;
    hideMenu();
  }, [onClickProp, hideOnClick, hideMenu]);
  props = {
    role: "menuitem",
    ...props,
    onClick
  };
  props = composite_compositeItem.useCompositeItem({
    state,
    preventScrollOnKeyDown,
    ...props
  }); // If the menu item is not inside a menu, but a menu bar, we don't want to
  // move focus to the menu item on mouse move, nor hide the menu on click.

  const isWithinMenu = !!state && "hide" in state;
  props = composite_compositeHover.useCompositeHover({
    state,
    focusOnHover: isWithinMenu,
    ...props
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
