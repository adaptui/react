import { useState, useCallback } from 'react';
import { useForkRef, useEventCallback, useBooleanEventCallback } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useHovercard } from '../hovercard/hovercard.js';
import { u as useParentMenu } from '../__utils-aac2c931.js';
import { useMenuList } from './menu-list.js';

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
    ...props
  } = _ref;
  const parentMenu = useParentMenu();
  const hasParentMenu = !!parentMenu;
  const [portalNode, setPortalNode] = useState(null);
  const portalRef = useForkRef(setPortalNode, props.portalRef);
  const domReady = !props.portal || portalNode;
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
    ...props,
    autoFocusOnShow: autoFocusOnShow && !!domReady
  });
  props = useHovercard({
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

const Menu = createComponent(props => {
  const htmlProps = useMenu(props);
  return createElement("div", htmlProps);
});

export { Menu, useMenu };
