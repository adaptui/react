import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { getPopupRole } from 'ariakit-utils/dom';
import { queueBeforeEvent } from 'ariakit-utils/events';
import { useEventCallback, useBooleanEventCallback, useRefId, useWrapElement, useForkRef } from 'ariakit-utils/hooks';
import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeTypeahead } from '../composite/composite-typeahead.js';
import { usePopoverDisclosure } from '../popover/popover-disclosure.js';
import { f as findFirstEnabledItemWithValue, S as SelectContext } from '../__utils-ce9ba82e.js';
import { SelectArrow } from './select-arrow.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { VisuallyHidden } from '../visually-hidden/visually-hidden.js';

function getSelectedValues(select) {
  return Array.from(select.selectedOptions).map(option => option.value);
} // When moving through the items when the select list is closed, we don't want
// to move to items without value, so we filter them out here.


function nextWithValue(items, next) {
  return () => {
    var _nextItem;

    const nextId = next();
    if (!nextId) return;
    let i = 0;
    let nextItem = items.find(item => item.id === nextId);
    const firstItem = nextItem;

    while (nextItem && nextItem.value == null) {
      const nextId = next(++i);
      if (!nextId) return;
      nextItem = items.find(item => item.id === nextId); // Prevents infinite loop when focusLoop is true

      if (nextItem === firstItem) break;
    }

    return (_nextItem = nextItem) == null ? void 0 : _nextItem.id;
  };
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select button.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelect({ state });
 * <Role {...props} />
 * ```
 */


const useSelect = createHook(_ref => {
  let {
    state,
    name,
    showOnKeyDown = true,
    moveOnKeyDown = true,
    toggleOnClick = false,
    toggleOnPress = !toggleOnClick,
    ...props
  } = _ref;
  toggleOnPress = toggleOnClick ? false : toggleOnPress;
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const showOnKeyDownProp = useBooleanEventCallback(showOnKeyDown);
  const moveOnKeyDownProp = useBooleanEventCallback(moveOnKeyDown);
  const toggleOnPressProp = useBooleanEventCallback(toggleOnPress);
  const dir = state.placement.split("-")[0];
  const multiSelectable = Array.isArray(state.value);
  const onKeyDown = useCallback(event => {
    var _findFirstEnabledItem;

    onKeyDownProp(event);
    if (event.defaultPrevented) return; // toggleOnPress

    if (event.key === " " || event.key === "Enter") {
      if (toggleOnPressProp(event)) {
        state.toggle();
      }
    } // moveOnKeyDown


    const isVertical = state.orientation !== "horizontal";
    const isHorizontal = state.orientation !== "vertical";
    const isGrid = !!((_findFirstEnabledItem = findFirstEnabledItemWithValue(state.items)) != null && _findFirstEnabledItem.rowId);
    const moveKeyMap = {
      ArrowUp: (isGrid || isVertical) && nextWithValue(state.items, state.up),
      ArrowRight: (isGrid || isHorizontal) && nextWithValue(state.items, state.next),
      ArrowDown: (isGrid || isVertical) && nextWithValue(state.items, state.down),
      ArrowLeft: (isGrid || isHorizontal) && nextWithValue(state.items, state.previous)
    };
    const getId = moveKeyMap[event.key];

    if (getId && moveOnKeyDownProp(event)) {
      event.preventDefault();
      state.move(getId());
    } // showOnKeyDown


    const isTopOrBottom = dir === "top" || dir === "bottom";
    const isLeft = dir === "left";
    const isRight = dir === "right";
    const canShowKeyMap = {
      ArrowDown: isTopOrBottom,
      ArrowUp: isTopOrBottom,
      ArrowLeft: isLeft,
      ArrowRight: isRight
    };
    const canShow = canShowKeyMap[event.key];

    if (canShow && showOnKeyDownProp(event)) {
      event.preventDefault();
      state.show();
      state.move(state.activeId);
    }
  }, [onKeyDownProp, toggleOnPressProp, state.toggle, state.orientation, state.items, state.up, state.next, state.down, state.previous, moveOnKeyDownProp, state.move, dir, showOnKeyDownProp, state.show, state.activeId]);
  const onMouseDownProp = useEventCallback(props.onMouseDown);
  const onMouseDown = useCallback(event => {
    onMouseDownProp(event);
    if (event.defaultPrevented) return;
    if (!toggleOnPressProp(event)) return;
    const element = event.currentTarget;
    queueBeforeEvent(element, "focusin", () => {
      state.disclosureRef.current = event.currentTarget;
      state.toggle();
    });
  }, [onMouseDownProp, toggleOnPressProp, state.toggle]);
  props = useStoreProvider({
    state,
    ...props
  }, SelectContext);
  const [autofill, setAutofill] = useState(false);
  const nativeSelectChangedRef = useRef(false); // Resets the autofilled state when the select value changes, but only if
  // the change wasn't triggered by the native select element (which is an
  // autofill).

  useEffect(() => {
    const nativeSelectChanged = nativeSelectChangedRef.current;
    nativeSelectChangedRef.current = false;
    if (nativeSelectChanged) return;
    setAutofill(false);
  }, [state.value]);
  const labelId = useRefId(state.labelRef);
  const label = props["aria-label"];
  const labelledBy = props["aria-labelledby"] || labelId;
  const values = useMemo( // Filter out items without value and duplicate values.
  () => [...new Set(state.items.map(i => i.value).filter(Boolean))], [state.items]); // Renders a native select element with the same value as the select so we
  // support browser autofill. When the native select value changes, the
  // onChange event is triggered and we set the autofill state to true.

  props = useWrapElement(props, element => /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(VisuallyHidden, {
      as: "select",
      tabIndex: -1,
      "aria-hidden": true,
      "aria-label": label,
      "aria-labelledby": labelledBy,
      name: name,
      value: state.value,
      multiple: multiSelectable,
      onChange: event => {
        nativeSelectChangedRef.current = true;
        setAutofill(true);
        state.setValue(multiSelectable ? getSelectedValues(event.target) : event.target.value);
      },
      children: values.map(value => /*#__PURE__*/jsx("option", {
        value: value,
        children: value
      }, value))
    }), element]
  }), [label, labelledBy, name, state.value, multiSelectable, state.setValue, values]);

  const children = /*#__PURE__*/jsxs(Fragment, {
    children: [state.value, /*#__PURE__*/jsx(SelectArrow, {})]
  });

  props = {
    role: "combobox",
    "aria-autocomplete": "none",
    "aria-labelledby": labelId,
    "aria-haspopup": getPopupRole(state.contentElement, "listbox"),
    "data-autofill": autofill ? "" : undefined,
    children,
    ...props,
    ref: useForkRef(state.selectRef, props.ref),
    onKeyDown,
    onMouseDown
  };
  props = usePopoverDisclosure({
    state,
    toggleOnClick,
    ...props
  });
  props = useCompositeTypeahead({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a select button.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */

const Select = createComponent(props => {
  const htmlProps = useSelect(props);
  return createElement("button", htmlProps);
});

export { Select, useSelect };
