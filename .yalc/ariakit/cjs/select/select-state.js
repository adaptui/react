'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var array = require('ariakit-utils/array');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var composite_compositeState = require('../composite/composite-state.js');
var popover_popoverState = require('../popover/popover-state.js');
var __utils = require('../__utils-87932646.js');

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
  const selectRef = react.useRef(null);
  const labelRef = react.useRef(null);
  const [value, setValue] = hooks.useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : "", props.value, props.setValue);
  const composite = composite_compositeState.useCompositeState({ ...props,
    virtualFocus,
    orientation,
    defaultActiveId,
    includesBaseElement
  });
  const popover = popover_popoverState.usePopoverState({ ...props,
    placement
  });
  const initialValue = hooks.useInitialValue((_props$value = props.value) != null ? _props$value : props.defaultValue);
  const compositeRef = hooks.useLiveRef(composite);
  const multiSelectable = Array.isArray(value); // Automatically sets the default value if it's not set.

  react.useEffect(() => {
    if (multiSelectable) return;
    if (initialValue != null) return;
    if (!composite.items.length) return;
    const item = __utils.findFirstEnabledItemWithValue(composite.items);
    if (!(item != null && item.value)) return;
    setValue(prevValue => {
      if (prevValue || !item.value) return prevValue;
      return item.value;
    });
  }, [multiSelectable, initialValue, composite.items, setValue]); // Sets the active id when the value changes and the popover is hidden.

  react.useEffect(() => {
    if (popover.mounted) return;
    const values = array.toArray(value);
    const lastValue = values[values.length - 1];
    if (!lastValue) return;
    const item = __utils.findEnabledItemByValue(composite.items, lastValue);
    if (!item) return;
    composite.setActiveId(item.id);
  }, [popover.mounted, composite.items, value, composite.setActiveId]);
  const mountedRef = hooks.useLiveRef(popover.mounted); // Sets the select value when the active item changes by moving (which usually
  // happens when moving to an item using the keyboard).

  react.useEffect(() => {
    if (multiSelectable) return;
    if (!setValueOnMove && mountedRef.current) return;
    const {
      activeId,
      items
    } = compositeRef.current;
    if (!composite.moves) return;
    if (!activeId) return;
    const item = __utils.findEnabledItemWithValueById(items, activeId);
    if ((item == null ? void 0 : item.value) == null) return;
    setValue(item.value);
  }, [multiSelectable, setValueOnMove, composite.moves, setValue]);
  const state = react.useMemo(() => ({ ...composite,
    ...popover,
    value,
    setValue,
    setValueOnMove,
    selectRef,
    labelRef
  }), [composite, popover, value, setValue, setValueOnMove]);
  return store.useStorePublisher(state);
}

exports.useSelectState = useSelectState;
