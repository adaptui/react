import { useCallback, useState, useEffect } from 'react';
import { useId, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { isMac, isSafari } from 'ariakit-utils/platform';
import { useStore, useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useComposite } from '../composite/composite.js';
import { useCompositeTypeahead } from '../composite/composite-typeahead.js';
import { M as MenuContext, a as MenuBarContext } from '../__utils-07f4a93f.js';

const isSafariOnMac = isMac() && isSafari();

function useAriaLabelledBy(_ref) {
  let {
    state,
    ...props
  } = _ref;
  const [id, setId] = useState(undefined);
  const label = props["aria-label"];
  useEffect(() => {
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


const useMenuList = createHook(_ref2 => {
  let {
    state,
    composite = true,
    ...props
  } = _ref2;
  const parentMenu = useStore(MenuContext, []);
  const parentMenuBar = useStore(MenuBarContext, ["items", "move", "next", "previous", "orientation"]);
  const hasParentMenu = !!parentMenu;
  const id = useId(props.id);
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const dir = state.placement.split("-")[0];
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  const isHorizontal = orientation !== "vertical";
  const isMenuBarHorizontal = !!parentMenuBar && (parentMenuBar == null ? void 0 : parentMenuBar.orientation) !== "vertical";
  const onKeyDown = useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (hasParentMenu || parentMenuBar && !isHorizontal) {
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
  }, [onKeyDownProp, hasParentMenu, parentMenuBar, isHorizontal, state.hide, dir]);
  props = useStoreProvider({
    state,
    ...props
  }, MenuContext);
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
    ref: useForkRef(id ? state.setContentElement : null, props.ref),
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

  props = useComposite({
    state,
    composite,
    ...props
  });
  props = useCompositeTypeahead({
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

const MenuList = createComponent(props => {
  const htmlProps = useMenuList(props);
  return createElement("div", htmlProps);
});

export { MenuList, useMenuList };
