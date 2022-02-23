import { useCallback } from 'react';
import { useEventCallback, useBooleanEventCallback } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeHover } from '../composite/composite-hover.js';
import { useCompositeItem } from '../composite/composite-item.js';
import { a as MenuContext } from '../__utils-aac2c931.js';

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
    ...props
  } = _ref;
  const context = MenuContext;
  state = useStore(state || context, ["move"]);
  const onClickProp = useEventCallback(props.onClick);
  const hideOnClickProp = useBooleanEventCallback(hideOnClick);
  const hideMenu = state && "hideAll" in state ? state.hideAll : undefined;
  const onClick = useCallback(event => {
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
  props = useCompositeItem({
    state,
    preventScrollOnKeyDown,
    ...props
  }); // If the menu item is not inside a menu, but a menu bar, we don't want to
  // move focus to the menu item on mouse move, nor hide the menu on click.

  const isWithinMenu = !!state && "hide" in state;
  props = useCompositeHover({
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

const MenuItem = createMemoComponent(props => {
  const htmlProps = useMenuItem(props);
  return createElement("div", htmlProps);
});

export { MenuItem, useMenuItem };
