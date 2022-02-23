import { useState, useEffect, useMemo } from 'react';
import { useControlledState, useLiveRef, useDeferredValue, useUpdateLayoutEffect } from 'ariakit-utils/hooks';
import { normalizeString } from 'ariakit-utils/misc';
import { isSafari, isTouchDevice } from 'ariakit-utils/platform';
import { useStorePublisher } from 'ariakit-utils/store';
import { useCompositeState } from '../composite/composite-state.js';
import { usePopoverState } from '../popover/popover-state.js';

const isSafariOnMobile = isSafari() && isTouchDevice();

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMatches(props) {
  if (props.limit === 0) return [];
  const value = normalizeString(props.value);
  const size = props.limit === false ? undefined : props.limit;
  const regex = new RegExp(escapeRegExp(value), "i");
  const matches = new Set(); // Get first the values that start with the search value.

  for (const v of props.list) {
    if (size && matches.size >= size) break;

    if (normalizeString(v).search(regex) === 0) {
      matches.add(v);
    }
  } // Then get any value that matches the search value.


  for (const v of props.list) {
    if (size && matches.size >= size) break;

    if (regex.test(normalizeString(v))) {
      matches.add(v);
    }
  }

  return Array.from(matches);
}
/**
 * Provides state for the `Combobox` components.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem>Item 1</ComboboxItem>
 *   <ComboboxItem>Item 2</ComboboxItem>
 *   <ComboboxItem>Item 3</ComboboxItem>
 * </ComboboxPopover>
 * ```
 */


function useComboboxState(_temp) {
  var _props$defaultValue;

  let {
    limit = false,
    defaultActiveId = null,
    includesBaseElement = true,
    orientation = "vertical",
    focusLoop = true,
    focusWrap = true,
    placement = "bottom-start",
    virtualFocus = !isSafariOnMobile,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [value, setValue] = useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : "", props.value, props.setValue);
  const [list, setList] = useControlledState(props.defaultList || [], props.list, props.setList);
  const composite = useCompositeState({ ...props,
    defaultActiveId,
    orientation,
    focusLoop,
    focusWrap,
    virtualFocus,
    includesBaseElement
  });
  const popover = usePopoverState({ ...props,
    placement
  });
  const [activeValue, setActiveValue] = useState();
  const compositeRef = useLiveRef(composite); // Always reset the active value when the active item changes.

  useEffect(() => {
    setActiveValue(undefined);
  }, [composite.activeId]); // Update the active value when the active item changes by moving (which
  // usually happens when using the keyboard).

  useEffect(() => {
    var _items$find;

    const {
      items,
      activeId
    } = compositeRef.current;
    if (!activeId) return;
    const nextActiveValue = (_items$find = items.find(item => item.id === activeId && item.value)) == null ? void 0 : _items$find.value;
    setActiveValue(nextActiveValue);
  }, [composite.moves]);
  const deferredValue = useDeferredValue(value);
  const matches = useMemo(() => getMatches({
    limit,
    list,
    value: deferredValue
  }), [limit, list, deferredValue]); // Resets the combobox state when it gets hidden. This effect should be sync
  // (layout effect), otherwise pressing tab while focusing on a combobox item
  // will always put focus back on the combobox input. See
  // ../composite/composite.ts#132

  useUpdateLayoutEffect(() => {
    if (popover.visible) return; // We need to reset the composite state when the popover is closed.

    composite.setActiveId(defaultActiveId);
    composite.setMoves(0);
  }, [popover.visible, composite.setActiveId, composite.setMoves]);
  const state = useMemo(() => ({ ...composite,
    ...popover,
    value,
    setValue,
    activeValue,
    list,
    setList,
    limit,
    matches
  }), [composite, popover, value, setValue, activeValue, list, setList, limit, matches]);
  return useStorePublisher(state);
}

export { useComboboxState };
