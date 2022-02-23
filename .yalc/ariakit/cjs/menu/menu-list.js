'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var platform = require('ariakit-utils/platform');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var composite_compositeTypeahead = require('../composite/composite-typeahead.js');
var __utils = require('../__utils-601a5088.js');

const isSafariOnMac = platform.isMac() && platform.isSafari();

function useAriaLabelledBy(_ref) {
  let {
    state,
    ...props
  } = _ref;
  const [id, setId] = react.useState(undefined);
  const label = props["aria-label"];
  react.useEffect(() => {
    const disclosure = state.disclosureRef.current;
    if (!disclosure) return;
    const menu = state.contentElement;
    if (!menu) return;
    const menuLabel = label || menu.hasAttribute("aria-label");

    if (menuLabel) {
      setId(undefined);
    } else if (disclosure.id) {
      setId(disclosure.id);
    }
  }, [label, state.disclosureRef, state.contentElement]);
  return id;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu list element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuList({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Role {...props}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Role>
 * ```
 */


const useMenuList = system.createHook(_ref2 => {
  let {
    state,
    autoFocusOnShow = true,
    composite = true,
    ...props
  } = _ref2;
  const parentMenu = __utils.useParentMenu();
  const parentMenuBar = store.useStore(__utils.MenuBarContext, ["items", "move", "next", "previous", "orientation"]);
  const hasParentMenu = !!parentMenu;
  const id = hooks.useId(props.id);
  hooks.useSafeLayoutEffect(() => {
    if (state.animating) return;
    if (!state.visible) return;
    if (!autoFocusOnShow) return;
    if (!state.autoFocusOnShow) return;

    switch (state.initialFocus) {
      case "first":
        {
          const firstId = state.first();

          if (firstId) {
            // Resets autoFocusOnShow so that it can be set the next time the
            // menu is opened.
            state.setAutoFocusOnShow(false);
            state.move(firstId);
          }

          break;
        }

      case "last":
        {
          const lastId = state.last();

          if (lastId) {
            state.setAutoFocusOnShow(false);
            state.move(lastId);
          }

          break;
        }

      case "container":
        {
          state.setAutoFocusOnShow(false);
          state.move(null);
        }
    }
  }, [state.animating, state.visible, autoFocusOnShow, state.autoFocusOnShow, state.initialFocus, state.first, state.setAutoFocusOnShow, state.move, state.last]);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const dir = state.placement.split("-")[0];
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  const isHorizontal = orientation !== "vertical";
  const isMenuBarHorizontal = !!parentMenuBar && (parentMenuBar == null ? void 0 : parentMenuBar.orientation) !== "vertical";
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (hasParentMenu) {
      const hideMap = {
        ArrowRight: () => dir === "left" && !isHorizontal,
        ArrowLeft: () => dir === "right" && !isHorizontal,
        ArrowUp: () => dir === "bottom" && isHorizontal,
        ArrowDown: () => dir === "top" && isHorizontal
      };
      const action = hideMap[event.key];

      if (action != null && action()) {
        event.stopPropagation();
        event.preventDefault();
        return state.hide();
      }
    }

    if (parentMenuBar) {
      const keyMap = {
        ArrowRight: () => {
          if (!isMenuBarHorizontal) return;
          return parentMenuBar.next();
        },
        ArrowLeft: () => {
          if (!isMenuBarHorizontal) return;
          return parentMenuBar.previous();
        },
        ArrowDown: () => {
          if (isMenuBarHorizontal) return;
          return parentMenuBar.next();
        },
        ArrowUp: () => {
          if (isMenuBarHorizontal) return;
          return parentMenuBar.previous();
        }
      };
      const action = keyMap[event.key];
      const id = action == null ? void 0 : action();

      if (id !== undefined) {
        event.stopPropagation();
        event.preventDefault();
        parentMenuBar.move(id);
      }
    }
  }, [onKeyDownProp, hasParentMenu, state.hide, dir, orientation, parentMenuBar]);
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.MenuContext);
  const ariaLabelledBy = useAriaLabelledBy({
    state,
    ...props
  });
  const style = state.mounted ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    "aria-labelledby": ariaLabelledBy,
    hidden: !state.mounted,
    ...props,
    ref: hooks.useForkRef(id ? state.setContentElement : null, props.ref),
    style,
    onKeyDown
  };

  if (composite) {
    props = {
      // Safari/VoiceOver doesn't work well when role="menu" elements are
      // hidden. So we have to use role="menubar" in this case. This may be a
      // problem for developers targeting [role="menu"] on CSS. We should
      // explicitly state that in the docs and remove this workaround as soon
      // as Safari/VoiceOver is fixed.
      role: isSafariOnMac ? "menubar" : "menu",
      "aria-orientation": orientation,
      ...props
    };
  }

  props = composite_composite.useComposite({
    state,
    composite,
    ...props
  });
  props = composite_compositeTypeahead.useCompositeTypeahead({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a menu list element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Edit</MenuButton>
 * <MenuList state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </MenuList>
 * ```
 */

const MenuList = system.createComponent(props => {
  const htmlProps = useMenuList(props);
  return system.createElement("div", htmlProps);
});

exports.MenuList = MenuList;
exports.useMenuList = useMenuList;
