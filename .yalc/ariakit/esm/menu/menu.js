import { useCallback, useMemo } from 'react';
import { hasFocusWithin } from 'ariakit-utils/focus';
import { useEventCallback, useBooleanEventCallback } from 'ariakit-utils/hooks';
import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useHovercard } from '../hovercard/hovercard.js';
import { M as MenuContext, a as MenuBarContext } from '../__utils-07f4a93f.js';
import { useMenuList } from './menu-list.js';

function getItemRefById(items, id) {
  var _items$find;

  if (!id) return;
  return (_items$find = items.find(item => item.id === id)) == null ? void 0 : _items$find.ref;
}
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


const useMenu = createHook(_ref => {
  let {
    state,
    hideOnEscape = true,
    autoFocusOnShow = true,
    hideOnHoverOutside,
    ...props
  } = _ref;
  const parentMenu = useStore(MenuContext, []);
  const parentMenuBar = useStore(MenuBarContext, []);
  const hasParentMenu = !!parentMenu;
  const parentIsMenuBar = !!parentMenuBar && !hasParentMenu;
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const hideOnEscapeProp = useBooleanEventCallback(hideOnEscape);
  const onKeyDown = useCallback(event => {
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
  props = useMenuList({
    state,
    ...props
  });
  const initialFocusRef = useMemo(() => state.initialFocus === "first" ? getItemRefById(state.items, state.first()) : state.initialFocus === "last" ? getItemRefById(state.items, state.last()) : state.baseRef, [state.initialFocus, state.items, state.first, state.last, state.baseRef]);
  props = useHovercard({
    state,
    autoFocusOnShow: state.autoFocusOnShow && autoFocusOnShow,
    initialFocusRef,
    ...props,
    hideOnHoverOutside: event => {
      if (typeof hideOnHoverOutside === "function") {
        return hideOnHoverOutside(event);
      }

      if (hideOnHoverOutside != null) return hideOnHoverOutside;

      if (hasParentMenu) {
        parentMenu.setActiveId(null);
        return true;
      }

      if (!parentIsMenuBar) return false;
      const disclosure = state.disclosureRef.current;
      if (!disclosure) return true;
      if (hasFocusWithin(disclosure)) return false;
      return true;
    },
    // If it's a submenu, it shouldn't behave like a modal dialog, nor display
    // a backdrop.
    modal: hasParentMenu ? false : props.modal,
    backdrop: hasParentMenu ? false : props.backdrop,
    // If it's a submenu, hide on esc will be handled differently. That is,
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

const Menu = createComponent(props => {
  const htmlProps = useMenu(props);
  return createElement("div", htmlProps);
});

export { Menu, useMenu };
