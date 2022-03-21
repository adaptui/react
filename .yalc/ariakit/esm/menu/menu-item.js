import { useCallback } from 'react';
import { useEventCallback, useBooleanEventCallback } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeHover } from '../composite/composite-hover.js';
import { useCompositeItem } from '../composite/composite-item.js';
import { a as MenuBarContext, M as MenuContext, h as hasExpandedMenuButton } from '../__utils-07f4a93f.js';

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
const useMenuItem = createHook(_ref => {
  let {
    state,
    hideOnClick = true,
    preventScrollOnKeyDown = true,
    focusOnHover,
    ...props
  } = _ref;
  // Use MenuBar state as a fallback.
  const menuBarState = useStore(state || MenuBarContext, ["items"]);
  state = useStore(state || MenuContext, ["move", "hideAll"]) || menuBarState;
  const onClickProp = useEventCallback(props.onClick);
  const hideOnClickProp = useBooleanEventCallback(hideOnClick);
  const hideMenu = state && "hideAll" in state ? state.hideAll : undefined;
  const isWithinMenu = !!hideMenu;
  const onClick = useCallback(event => {
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
  props = useCompositeItem({
    state,
    preventScrollOnKeyDown,
    ...props
  });
  props = useCompositeHover({
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
      else if (hasExpandedMenuButton((_state = state) == null ? void 0 : _state.items, event.currentTarget)) {
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

const MenuItem = createMemoComponent(props => {
  const htmlProps = useMenuItem(props);
  return createElement("div", htmlProps);
});

export { MenuItem, useMenuItem };
