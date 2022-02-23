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
var __utils = require('../__utils-601a5088.js');

function hasExpandedMenuButton(items, currentElement) {
  return items.filter(item => item.ref.current !== currentElement).some(item => {
    var _item$ref$current;

    return ((_item$ref$current = item.ref.current) == null ? void 0 : _item$ref$current.getAttribute("aria-expanded")) === "true";
  });
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
    ...props
  } = _ref;
  const parentMenu = __utils.useParentMenu(["items"]);
  const parentMenuBar = store.useStore(__utils.MenuBarContext, ["items", "move"]);
  const hasParentMenu = !!parentMenu;
  const parentIsMenuBar = !!parentMenuBar && !hasParentMenu;
  const disabled = props.disabled || props["aria-disabled"];
  const id = hooks.useId(props.id);
  const onMouseMoveProp = hooks.useEventCallback(props.onMouseMove);
  const onMouseMove = react.useCallback(event => {
    onMouseMoveProp(event);
    if (event.defaultPrevented) return;
    if (disabled) return; // We only want to focus on the menu button if it's in a menu bar

    if (!parentMenuBar) return;
    if (!parentIsMenuBar) return; // and there's already another expanded menu button.

    if (hasExpandedMenuButton(parentMenuBar.items)) {
      parentMenuBar.move(id);
    }
  }, [onMouseMoveProp, disabled, parentMenuBar, parentIsMenuBar, id]);
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    if (disabled) return; // When the menu button is focused, we'll only show its menu if it's in
    // a menu bar

    if (!parentMenuBar) return;
    if (!parentIsMenuBar) return; // and there's already another expanded menu button.

    if (hasExpandedMenuButton(parentMenuBar.items, event.currentTarget)) {
      state.show();
    }
  }, [onFocusProp, disabled, parentMenuBar, parentIsMenuBar, state.show]);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const dir = state.placement.split("-")[0];
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    const keyMap = {
      ArrowDown: dir === "bottom" || dir === "top" ? "first" : false,
      ArrowUp: dir === "bottom" || dir === "top" ? "last" : false,
      ArrowRight: dir === "right" ? "first" : false,
      ArrowLeft: dir === "left" ? "first" : false
    };
    const initialFocus = keyMap[event.key];

    if (initialFocus) {
      event.preventDefault();
      state.show();
      state.setAutoFocusOnShow(true);
      state.setInitialFocus(initialFocus);
    }
  }, [onKeyDownProp, state.mounted, dir, state.show, state.setAutoFocusOnShow, state.setInitialFocus]);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (state.mounted) return;

    if (!parentIsMenuBar) {
      state.setAutoFocusOnShow(true);
      state.setInitialFocus(event.detail ? "container" : "first");
    }

    if (hasParentMenu && !parentIsMenuBar) {
      state.show();
    }
  }, [onClickProp, state.mounted, parentIsMenuBar, state.setAutoFocusOnShow, state.setInitialFocus, hasParentMenu, state.show]);

  if (hasParentMenu) {
    // On Safari, VO+Space triggers a click twice on native button elements
    // with role menuitem (https://bugs.webkit.org/show_bug.cgi?id=228318).
    // So, if the menu button is rendered within a menu, we need to render it
    // as another element.
    props = {
      as: "div",
      ...props
    };
  }

  props = {
    id,
    "aria-haspopup": dom.getPopupRole(state.contentElement, "menu"),
    ...props,
    onMouseMove,
    onFocus,
    onKeyDown,
    onClick
  };
  props = hovercard_hovercardAnchor.useHovercardAnchor({
    state,
    showOnHover: hasParentMenu,
    focusable,
    accessibleWhenDisabled,
    ...props
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
