import { useState, useCallback, useMemo } from 'react';
import { useControlledState } from 'ariakit-utils/hooks';
import { applyState } from 'ariakit-utils/misc';
import { useStore, useStorePublisher } from 'ariakit-utils/store';
import { useCompositeState } from '../composite/composite-state.js';
import { useHovercardState } from '../hovercard/hovercard-state.js';
import { M as MenuContext, a as MenuBarContext } from '../__utils-07f4a93f.js';

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
  var _timeout;

  let {
    orientation = "vertical",
    timeout,
    hideTimeout = 0,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [initialFocus, setInitialFocus] = useState("container");
  const [values, setValues] = useControlledState(props.defaultValues || {}, props.values, props.setValues);
  const parentMenu = useStore(MenuContext, ["orientation", "hideAll"]);
  const parentMenuBar = useStore(MenuBarContext, ["orientation"]);
  const contextOrientation = (parentMenu == null ? void 0 : parentMenu.orientation) || (parentMenuBar == null ? void 0 : parentMenuBar.orientation);
  const parentIsMenuBar = !!parentMenuBar && !parentMenu; // Defines the placement of the menu popover based on the parent orientation.

  const placement = props.placement || (contextOrientation === "vertical" ? "right-start" : "bottom-start");
  timeout = ((_timeout = timeout) != null ? _timeout : parentIsMenuBar) ? 0 : 150;
  const composite = useCompositeState({
    orientation,
    ...props
  });
  const hovercard = useHovercardState({
    timeout,
    hideTimeout,
    ...props,
    placement
  });
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
    hovercard.hide();
    parentMenu == null ? void 0 : parentMenu.hideAll();
  }, [hovercard.hide, parentMenu == null ? void 0 : parentMenu.hideAll]);
  const state = useMemo(() => ({ ...composite,
    ...hovercard,
    initialFocus,
    setInitialFocus,
    values,
    setValues,
    setValue,
    hideAll
  }), [composite, hovercard, initialFocus, setInitialFocus, values, setValues, setValue, hideAll]);
  return useStorePublisher(state);
}

export { useMenuState };
