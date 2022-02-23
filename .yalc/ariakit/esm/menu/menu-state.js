import { useState, useCallback, useMemo } from 'react';
import { useControlledState, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { applyState } from 'ariakit-utils/misc';
import { useStorePublisher, useStore } from 'ariakit-utils/store';
import { useCompositeState } from '../composite/composite-state.js';
import { useHovercardState } from '../hovercard/hovercard-state.js';
import { u as useParentMenu, M as MenuBarContext } from '../__utils-aac2c931.js';

function useParentOrientation(parentMenu) {
  const parentMenuBar = useStore(MenuBarContext, ["orientation"]);

  if (parentMenu) {
    return parentMenu.orientation;
  }

  return parentMenuBar == null ? void 0 : parentMenuBar.orientation;
}
/**
 * Provides state for the `Menu` components.
 * @example
 * ```jsx
 * const menu = useMenuState({ placement: "top" });
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */


function useMenuState(_temp) {
  let {
    orientation = "vertical",
    timeout = 150,
    hideTimeout = 0,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [initialFocus, setInitialFocus] = useState("container");
  const [values, setValues] = useControlledState(props.defaultValues || {}, props.values, props.setValues);
  const parentMenu = useParentMenu(["orientation", "hideAll"]);
  const contextOrientation = useParentOrientation(parentMenu); // Defines the placement of the menu popover based on the parent orientation.

  const placement = props.placement || (contextOrientation === "vertical" ? "right-start" : "bottom-start");
  const composite = useCompositeState({
    orientation,
    ...props
  });
  const hoverCard = useHovercardState({
    timeout,
    hideTimeout,
    ...props,
    placement
  }); // TODO: Comment. Sometimes re-opening the menu in a menu bar will move focus.
  // Maybe should reset activeId as well. Needs to be layout effect because of
  // context menu subsequent clicks.

  useSafeLayoutEffect(() => {
    if (!hoverCard.visible) {
      composite.setMoves(0);
    }
  }, [hoverCard.visible, composite.setMoves]);
  const setValue = useCallback((name, value) => {
    // Preventing prototype pollution.
    if (name === "__proto__" || name === "constructor") return;
    setValues(prevValues => {
      const prevValue = prevValues[name];
      const nextValue = applyState(value, prevValue);

      if (nextValue === prevValue) {
        return prevValues;
      }

      return { ...prevValues,
        [name]: nextValue === undefined ? !!nextValue : nextValue
      };
    });
  }, [setValues]);
  const hideAll = useCallback(() => {
    hoverCard.hide();
    parentMenu == null ? void 0 : parentMenu.hideAll();
  }, [hoverCard.hide, parentMenu == null ? void 0 : parentMenu.hideAll]);
  const state = useMemo(() => ({ ...composite,
    ...hoverCard,
    initialFocus,
    setInitialFocus,
    values,
    setValues,
    setValue,
    hideAll
  }), [composite, hoverCard, initialFocus, setInitialFocus, values, setValues, setValue, hideAll]);
  return useStorePublisher(state);
}

export { useMenuState };
