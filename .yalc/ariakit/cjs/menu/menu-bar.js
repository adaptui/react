'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var __utils = require('../__utils-6be0b335.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu bar that may contain a group of menu items
 * that control other submenus.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuBarState();
 * const menuBarProps = useMenuBar({ state });
 * const fileProps = useMenuItem({ state });
 * const fileMenu = useMenuState();
 * <Role {...menuBarProps}>
 *   <MenuButton {...fileProps} state={fileMenu}>
 *     File
 *   </MenuButton>
 *   <Menu state={fileMenu}>
 *     <MenuItem>New File</MenuItem>
 *     <MenuItem>New Window</MenuItem>
 *   </Menu>
 * </Role>
 * ```
 */
const useMenuBar = system.createHook(_ref => {
  let {
    state,
    composite = true,
    ...props
  } = _ref;
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.MenuBarContext);

  if (composite) {
    props = {
      role: "menubar",
      "aria-orientation": orientation,
      ...props
    };
  }

  props = composite_composite.useComposite({
    state,
    composite,
    ...props
  });
  return props;
});
/**
 * A component that renders a menu bar that may contain a group of menu items
 * that control other submenus.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuBarState();
 * const fileProps = useMenuItem({ state });
 * const editProps = useMenuItem({ state });
 * const fileMenu = useMenuState();
 * const editMenu = useMenuState();
 * <MenuBar state={state}>
 *   <MenuButton {...fileProps} state={fileMenu}>
 *     File
 *   </MenuButton>
 *   <Menu state={fileMenu}>
 *     <MenuItem>New File</MenuItem>
 *     <MenuItem>New Window</MenuItem>
 *   </Menu>
 *   <MenuButton {...editProps} state={editMenu}>
 *     Edit
 *   </MenuButton>
 *   <Menu state={editMenu}>
 *     <MenuItem>Undo</MenuItem>
 *     <MenuItem>Redo</MenuItem>
 *   </Menu>
 * </MenuBar>
 * ```
 */

const MenuBar = system.createComponent(props => {
  const htmlProps = useMenuBar(props);
  return system.createElement("div", htmlProps);
});

exports.MenuBar = MenuBar;
exports.useMenuBar = useMenuBar;
