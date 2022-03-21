'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeTypeahead = require('../composite/composite-typeahead.js');
var hovercard_hovercardAnchor = require('../hovercard/hovercard-anchor.js');
var popover_popoverDisclosure = require('../popover/popover-disclosure.js');
var __utils = require('../__utils-6be0b335.js');

function getInitialFocus(event, dir) {
  const keyMap = {
    ArrowDown: dir === "bottom" || dir === "top" ? "first" : false,
    ArrowUp: dir === "bottom" || dir === "top" ? "last" : false,
    ArrowRight: dir === "right" ? "first" : false,
    ArrowLeft: dir === "left" ? "first" : false
  };
  return keyMap[event.key];
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu button that triggers a dropdown menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuButton({ state });
 * <Role {...props}>Edit</Role>
 * <Menu state={state}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */


const useMenuButton = system.createHook(_ref => {
  let {
    state,
    focusable,
    accessibleWhenDisabled,
    showOnHover,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const parentMenu = store.useStore(__utils.MenuContext, ["items", "move"]);
  const parentMenuBar = store.useStore(__utils.MenuBarContext, ["items", "move"]);
  const hasParentMenu = !!parentMenu;
  const parentIsMenuBar = !!parentMenuBar && !hasParentMenu;
  const disabled = props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  react.useEffect(() => {
    // Makes sure that the menu button is assigned as the menu disclosure
    // element. This is needed to support screen reader focusing on sibling
    // menu items.
    state.disclosureRef.current = ref.current;
  });
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (disabled) return;
    if (event.defaultPrevented) return; // Reset the autoFocusOnShow state so we can focus the menu button while
    // the menu is open and press arrow keys to move focus to the menu
    // items.

    state.setAutoFocusOnShow(false); // We need to unset the active menu item so no menu item appears active
    // while the menu button is focused.

    state.setActiveId(null); // When the menu button is focused, we'll only show its menu if it's in
    // a menu bar

    if (!parentMenuBar) return;
    if (!parentIsMenuBar) return; // and there's already another expanded menu button.

    if (__utils.hasExpandedMenuButton(parentMenuBar.items, event.currentTarget)) {
      state.show();
    }
  }, [onFocusProp, disabled, state.setAutoFocusOnShow, state.setActiveId, parentMenuBar, parentIsMenuBar, state.show]);
  const dir = state.placement.split("-")[0];
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (disabled) return;
    if (event.defaultPrevented) return;
    const initialFocus = getInitialFocus(event, dir);

    if (initialFocus) {
      event.preventDefault();
      state.show();
      state.setAutoFocusOnShow(true);
      state.setInitialFocus(initialFocus);
    }
  }, [onKeyDownProp, disabled, dir, state.show, state.setAutoFocusOnShow, state.setInitialFocus]);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    const isKeyboardClick = !event.detail; // When the menu button is clicked, if the menu is hidden or if it's
    // a keyboard click (enter or space),

    if (!state.mounted || isKeyboardClick) {
      // we'll only automatically focus on the menu if it's not a submenu
      // button, or if it's a keyboard click.
      if (!hasParentMenu || isKeyboardClick) {
        state.setAutoFocusOnShow(true);
      }

      state.setInitialFocus(isKeyboardClick ? "first" : "container");
    } // On submenu buttons, we can't hide the submenu by clicking on the menu
    // button again.


    if (hasParentMenu) {
      state.show();
    }
  }, [onClickProp, state.mounted, state.setAutoFocusOnShow, state.setInitialFocus, hasParentMenu, state.show]);

  if (hasParentMenu) {
    // On Safari, VO+Space triggers a click twice on native button elements
    // with role menuitem (https://bugs.webkit.org/show_bug.cgi?id=228318).
    // So, if the menu button is rendered within a menu, we need to render it
    // as another element.
    props = {
      as: "div",
      ...props
    };
  } // We'll use this id to render the aria-labelledby attribute on the menu.


  const id = hooks.useId(props.id);
  props = {
    id,
    role: hasParentMenu || parentIsMenuBar ? "menuitem" : undefined,
    "aria-haspopup": dom.getPopupRole(state.contentElement, "menu"),
    ...props,
    ref: hooks.useForkRef(ref, props.ref),
    onFocus,
    onKeyDown,
    onClick
  };
  props = hovercard_hovercardAnchor.useHovercardAnchor({
    state,
    focusable,
    accessibleWhenDisabled,
    ...props,
    showOnHover: event => {
      if (typeof showOnHover === "function") return showOnHover(event);
      if (showOnHover != null) return showOnHover;
      if (hasParentMenu) return true;
      return parentIsMenuBar && __utils.hasExpandedMenuButton(parentMenuBar.items);
    }
  });
  props = popover_popoverDisclosure.usePopoverDisclosure({
    state,
    toggleOnClick: !hasParentMenu,
    focusable,
    accessibleWhenDisabled,
    ...props
  });
  props = composite_compositeTypeahead.useCompositeTypeahead({
    state,
    typeahead: parentIsMenuBar,
    ...props
  });
  return props;
});
/**
 * A component that renders a menu button that triggers a dropdown menu.
 * Usually, this is rendered as a native `button` element, but if it's a submenu
 * button rendered as a menu item inside another menu, it'll be rendered as a
 * `div`.
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

const MenuButton = system.createComponent(props => {
  const htmlProps = useMenuButton(props);
  return system.createElement("button", htmlProps);
});

exports.MenuButton = MenuButton;
exports.useMenuButton = useMenuButton;
