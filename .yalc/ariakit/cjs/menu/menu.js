'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var hovercard_hovercard = require('../hovercard/hovercard.js');
var __utils = require('../__utils-601a5088.js');
var menu_menuList = require('./menu-list.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a dropdown menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenu({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Role {...props}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Role>
 * ```
 */

const useMenu = system.createHook(_ref => {
  let {
    state,
    hideOnEscape = true,
    autoFocusOnShow = true,
    ...props
  } = _ref;
  const parentMenu = __utils.useParentMenu();
  const hasParentMenu = !!parentMenu;
  const [portalNode, setPortalNode] = react.useState(null);
  const portalRef = hooks.useForkRef(setPortalNode, props.portalRef);
  const domReady = !props.portal || portalNode;
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const hideOnEscapeProp = hooks.useBooleanEventCallback(hideOnEscape);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      if (!hideOnEscapeProp(event)) return;

      if (!hasParentMenu) {
        // On Esc, only stop propagation if there's no parent menu.
        // Otherwise, pressing Esc should close all menus
        event.stopPropagation();
      }

      return state.hide();
    }
  }, [onKeyDownProp, hideOnEscapeProp, hasParentMenu, state.hide]);
  props = { ...props,
    onKeyDown
  };
  props = menu_menuList.useMenuList({
    state,
    ...props,
    autoFocusOnShow: autoFocusOnShow && !!domReady
  });
  props = hovercard_hovercard.useHovercard({
    state,
    autoFocusOnShow: false,
    hideOnHoverOutside: hasParentMenu,
    ...props,
    portalRef,
    // If it's a sub menu, it should behave like a modal dialog, nor display a
    // backdrop.
    modal: hasParentMenu ? false : props.modal,
    backdrop: hasParentMenu ? false : props.backdrop,
    // If it's a sub menu, hide on esc will be handled differently. That is,
    // event.stopPropagation() won't be called, so the parent menus will also
    // be closed.
    hideOnEscape: hasParentMenu ? false : hideOnEscape
  });
  return props;
});
/**
 * A component that renders a dropdown menu element.
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

const Menu = system.createComponent(props => {
  const htmlProps = useMenu(props);
  return system.createElement("div", htmlProps);
});

exports.Menu = Menu;
exports.useMenu = useMenu;
