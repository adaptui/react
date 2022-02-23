'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var misc = require('ariakit-utils/misc');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var popover_popoverAnchor = require('../popover/popover-anchor.js');

function isFirstItemAutoSelected(items, activeValue, autoSelect) {
  if (!autoSelect) return false;
  const firstItem = items.find(item => !item.disabled && item.value);
  return (firstItem == null ? void 0 : firstItem.value) === activeValue;
}

function hasCompletionString(value, activeValue) {
  if (!activeValue) return false;
  if (value == null) return false;
  value = misc.normalizeString(value);
  return activeValue.length > value.length && activeValue.toLowerCase().indexOf(value.toLowerCase()) === 0;
}

function isInputEvent(event) {
  return event.type === "input";
}

function isPrintableKey(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox input.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useCombobox({ state });
 * <Role {...props} />
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */


const useCombobox = system.createHook(_ref => {
  var _state$contentElement;

  let {
    state,
    focusable = true,
    autoSelect = false,
    showOnChange = true,
    showOnMouseDown = true,
    showOnKeyDown = true,
    autoComplete = state.list.length ? "list" : "none",
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const [valueUpdated, forceValueUpdate] = hooks.useForceUpdate();
  const hasInsertedTextRef = react.useRef(false); // We can only allow auto select when the combobox focus is handled via the
  // aria-activedescendant attribute. Othwerwise, the focus would move to the
  // first item on every keypress.

  autoSelect = !!autoSelect && state.virtualFocus;
  const inline = autoComplete === "inline" || autoComplete === "both"; // The current input value may differ from state.value when
  // autoComplete is either "both" or "inline", in which case it will be
  // the active item value or a combination of the input value and the active
  // item value if it's the first item and it's been auto selected. This will
  // only affect the element's value, not the combobox state.

  const value = react.useMemo(() => {
    if (!inline) {
      return state.value;
    }

    const firstItemAutoSelected = isFirstItemAutoSelected(state.items, state.activeValue, autoSelect);

    if (firstItemAutoSelected) {
      // If the first item is auto selected, we should append the completion
      // string to the end of the value. This will be highlited in the effect
      // below.
      if (hasCompletionString(state.value, state.activeValue)) {
        var _state$activeValue;

        const slice = ((_state$activeValue = state.activeValue) == null ? void 0 : _state$activeValue.slice(state.value.length)) || "";
        return state.value + slice;
      }

      return state.value;
    }

    return state.activeValue || state.value;
  }, [inline, state.value, state.items, autoSelect, state.activeValue]); // Highlights the completion string

  react.useEffect(() => {
    if (!inline) return;
    if (!state.activeValue) return;
    const firstItemAutoSelected = isFirstItemAutoSelected(state.items, state.activeValue, autoSelect);
    if (!firstItemAutoSelected) return;
    if (!hasCompletionString(state.value, state.activeValue)) return;
    const element = ref.current;
    if (!element) return;
    element.setSelectionRange(state.value.length, state.activeValue.length);
  }, [valueUpdated, inline, state.activeValue, state.items, autoSelect, state.value]); // Auto select the first item on type. Must be a layout effect, otherwise it
  // doesn't work well with useDeferredValue.

  hooks.useUpdateEffect(() => {
    if (!autoSelect) return;
    if (!state.items.length) return;
    if (!hasInsertedTextRef.current) return; // If autoSelect is set to true and the last change was a text insertion,
    // we want to automatically focus on the first suggestion. This effect
    // will run both when value changes and when items change so we can also
    // catch async items. We need to defer the focus to avoid scroll jumps.

    const timeout = setTimeout(() => state.move(state.first()), 16);
    return () => clearTimeout(timeout);
  }, [valueUpdated, state.value, autoSelect, state.items, state.move, state.first]); // Focus on the combobox input on type.

  hooks.useUpdateEffect(() => {
    if (autoSelect) return;
    state.setActiveId(null);
  }, [valueUpdated, autoSelect, state.setActiveId]); // If it has inline auto completion, set the state value when the combobox
  // input or the combobox list lose focus.

  react.useEffect(() => {
    if (!inline) return;
    const combobox = ref.current;
    if (!combobox) return;
    const elements = [combobox, state.contentElement].filter(Boolean);

    const onBlur = event => {
      if (elements.every(el => events.isFocusEventOutside(event, el))) {
        state.setValue(value);
      }
    };

    elements.forEach(el => el == null ? void 0 : el.addEventListener("focusout", onBlur));
    return () => {
      elements.forEach(el => el == null ? void 0 : el.removeEventListener("focusout", onBlur));
    };
  }, [inline, state.contentElement, state.setValue, value]);
  const onChangeProp = hooks.useEventCallback(props.onChange);
  const showOnChangeProp = hooks.useBooleanEventCallback(showOnChange);
  const onChange = react.useCallback(event => {
    onChangeProp(event);
    if (event.defaultPrevented) return;
    const nativeEvent = event.nativeEvent;

    if (isInputEvent(nativeEvent)) {
      hasInsertedTextRef.current = nativeEvent.inputType === "insertText";
    }

    if (showOnChangeProp(event)) {
      state.show();
    }

    state.setValue(event.target.value);

    if (inline && autoSelect) {
      // The state.setValue(event.target.value) above may not trigger a
      // state update. For example, say the first item starts with "t". The
      // user starts typing "t", then the first item is auto selected and
      // the inline completion string is appended and highlited. The user
      // then selects all the text and type "t" again. This change will
      // produce the same value as the state value, and therefore the state
      // update will not trigger a re-render. We need to force a re-render
      // here so the inline completion effect will be fired.
      forceValueUpdate();
    }

    if (!autoSelect || !hasInsertedTextRef.current) {
      // If autoSelect is not set or it's not an insertion of text, focus on
      // the combobox input after changing the value.
      state.setActiveId(null);
    }
  }, [onChangeProp, state.setValue, showOnChangeProp, state.show, inline, autoSelect, state.setActiveId]);
  const onCompositionEndProp = hooks.useEventCallback(props.onCompositionEnd); // When dealing with composition text (for example, when the user is typing
  // in accents or chinese characters), we need to set hasInsertedTextRef to
  // true when the composition ends. This is because the native input event
  // that's passed to the change event above will not produce a consistent
  // inputType value across browsers, so we can't rely on that there.

  const onCompositionEnd = react.useCallback(event => {
    onCompositionEndProp(event);
    if (event.defaultPrevented) return;
    hasInsertedTextRef.current = true;
    if (!autoSelect) return;
    forceValueUpdate();
  }, [onCompositionEndProp, autoSelect]);
  const onMouseDownProp = hooks.useEventCallback(props.onMouseDown);
  const showOnMouseDownProp = hooks.useBooleanEventCallback(showOnMouseDown);
  const onMouseDown = react.useCallback(event => {
    onMouseDownProp(event);
    if (event.defaultPrevented) return;

    if (showOnMouseDownProp(event)) {
      events.queueBeforeEvent(event.currentTarget, "mouseup", state.show);
    }
  }, [onMouseDownProp, showOnMouseDownProp, state.show]);
  const onClickProp = hooks.useEventCallback(props.onClick); // When clicking on the combobox input, we should make sure the current
  // input value is set on the state and focus is set on the input only.

  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    state.setActiveId(null);
    state.setValue(value);
  }, [onClickProp, state.setActiveId, state.setValue, value]);
  const onKeyDownCaptureProp = hooks.useEventCallback(props.onKeyDownCapture);
  const onKeyDownCapture = react.useCallback(event => {
    onKeyDownCaptureProp(event);
    if (event.defaultPrevented) return;

    if (isPrintableKey(event)) {
      // Printable characters shouldn't perform actions on the combobox
      // items, only on the combobox input.
      return event.stopPropagation();
    }

    const hasRows = state.items.some(item => !!item.rowId);
    const focusingInputOnly = state.activeId === null; // Pressing Home or End keys on the combobox should only be allowed when
    // the widget has rows and the combobox input is not the only element
    // with focus. That is, the aria-activedescendant has no value.

    const allowHorizontalNavigationOnItems = hasRows && !focusingInputOnly;
    const isHomeOrEnd = event.key === "Home" || event.key === "End"; // If there are no rows or the combobox input is the only focused
    // element, then we should stop the event propagation so no action is
    // performed on the combobox items, but only on the combobox input, like
    // moving the caret/selection.

    if (!allowHorizontalNavigationOnItems && isHomeOrEnd) {
      event.stopPropagation();
    }
  }, [onKeyDownCaptureProp, state.items, state.activeId]);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const showOnKeyDownProp = hooks.useBooleanEventCallback(showOnKeyDown);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    hasInsertedTextRef.current = false;
    if (event.defaultPrevented) return;
    if (event.ctrlKey) return;
    if (event.altKey) return;
    if (event.shiftKey) return;
    if (event.metaKey) return;
    if (state.visible) return;
    if (state.activeId !== null) return; // Up and Down arrow keys should open the combobox popover.

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (showOnKeyDownProp(event)) {
        event.preventDefault();
        state.show();
      }
    }
  }, [onKeyDownProp, state.move, state.activeId, state.visible, showOnKeyDownProp, state.show]);
  props = {
    role: "combobox",
    "aria-autocomplete": autoComplete,
    "aria-haspopup": dom.getPopupRole(state.contentElement, "listbox"),
    "aria-expanded": state.visible,
    "aria-controls": (_state$contentElement = state.contentElement) == null ? void 0 : _state$contentElement.id,
    value,
    ...props,
    ref: hooks.useForkRef(ref, props.ref),
    onChange,
    onCompositionEnd,
    onMouseDown,
    onClick,
    onKeyDownCapture,
    onKeyDown
  };
  props = composite_composite.useComposite({
    state,
    focusable,
    ...props
  });
  props = popover_popoverAnchor.usePopoverAnchor({
    state,
    ...props
  });
  return {
    autoComplete: "off",
    ...props
  };
});
/**
 * A component that renders a combobox input.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */

const Combobox = system.createComponent(props => {
  const htmlProps = useCombobox(props);
  return system.createElement("input", htmlProps);
});

exports.Combobox = Combobox;
exports.useCombobox = useCombobox;
