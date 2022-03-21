import { useRef, useEffect, useMemo } from 'react';
import { toArray } from 'ariakit-utils/array';
import { useControlledState, useInitialValue, useLiveRef } from 'ariakit-utils/hooks';
import { useStorePublisher } from 'ariakit-utils/store';
import { useCompositeState } from '../composite/composite-state.js';
import { usePopoverState } from '../popover/popover-state.js';
import { f as findFirstEnabledItemWithValue, a as findEnabledItemByValue, b as findEnabledItemWithValueById } from '../__utils-ce9ba82e.js';

/**
 * Provides state for the `Select` components.
 * @example
 * ```jsx
 * const select = useSelectState({ defaultValue: "Apple" });
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */
function useSelectState(_temp) {
  var _props$defaultValue, _props$value;

  let {
    virtualFocus = true,
    orientation = "vertical",
    placement = "bottom-start",
    setValueOnMove = false,
    defaultActiveId = null,
    includesBaseElement = false,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const selectRef = useRef(null);
  const labelRef = useRef(null);
  const [value, setValue] = useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : "", props.value, props.setValue);
  const composite = useCompositeState({ ...props,
    virtualFocus,
    orientation,
    defaultActiveId,
    includesBaseElement
  });
  const popover = usePopoverState({ ...props,
    placement
  });
  const initialValue = useInitialValue((_props$value = props.value) != null ? _props$value : props.defaultValue);
  const compositeRef = useLiveRef(composite);
  const multiSelectable = Array.isArray(value); // Automatically sets the default value if it's not set.

  useEffect(() => {
    if (multiSelectable) return;
    if (initialValue != null) return;
    if (!composite.items.length) return;
    const item = findFirstEnabledItemWithValue(composite.items);
    if (!(item != null && item.value)) return;
    setValue(prevValue => {
      if (prevValue || !item.value) return prevValue;
      return item.value;
    });
  }, [multiSelectable, initialValue, composite.items, setValue]); // Sets the active id when the value changes and the popover is hidden.

  useEffect(() => {
    if (popover.mounted) return;
    const values = toArray(value);
    const lastValue = values[values.length - 1];
    if (!lastValue) return;
    const item = findEnabledItemByValue(composite.items, lastValue);
    if (!item) return;
    composite.setActiveId(item.id);
  }, [popover.mounted, composite.items, value, composite.setActiveId]);
  const mountedRef = useLiveRef(popover.mounted); // Sets the select value when the active item changes by moving (which usually
  // happens when moving to an item using the keyboard).

  useEffect(() => {
    if (multiSelectable) return;
    if (!setValueOnMove && mountedRef.current) return;
    const {
      activeId,
      items
    } = compositeRef.current;
    if (!composite.moves) return;
    if (!activeId) return;
    const item = findEnabledItemWithValueById(items, activeId);
    if ((item == null ? void 0 : item.value) == null) return;
    setValue(item.value);
  }, [multiSelectable, setValueOnMove, composite.moves, setValue]);
  const state = useMemo(() => ({ ...composite,
    ...popover,
    value,
    setValue,
    setValueOnMove,
    selectRef,
    labelRef
  }), [composite, popover, value, setValue, setValueOnMove]);
  return useStorePublisher(state);
}

export { useSelectState };
