'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var array = require('ariakit-utils/array');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var focusable_focusable = require('../focusable/focusable.js');
var __utils = require('../__utils-57ccda4f.js');

function canProxyKeyboardEvent(event) {
  if (!events.isSelfTarget(event)) return false;
  if (event.metaKey) return false;
  if (event.key === "Tab") return false; // If the propagation of the event has been prevented, we don't want to proxy
  // this event to the active item element. For example, on a combobox, the Home
  // and End keys shouldn't propagate to the active item, but move the caret on
  // the combobox input instead.

  if (event.isPropagationStopped()) return false;
  return true;
}

function useKeyboardEventProxy(activeItem, onKeyboardEventProp) {
  const onKeyboardEvent = hooks.useEventCallback(onKeyboardEventProp);
  return react.useCallback(event => {
    onKeyboardEvent(event);
    if (event.defaultPrevented) return;

    if (canProxyKeyboardEvent(event)) {
      const activeElement = activeItem == null ? void 0 : activeItem.ref.current;
      if (!activeElement) return;
      const {
        view,
        ...eventInit
      } = event;

      if (!events.fireKeyboardEvent(activeElement, event.type, eventInit)) {
        event.preventDefault();
      } // The event will be triggered on the composite item and then
      // propagated up to this composite element again, so we can pretend
      // that it wasn't called on this component in the first place.


      if (event.currentTarget.contains(activeElement)) {
        event.stopPropagation();
      }
    }
  }, [onKeyboardEvent, activeItem]);
}

function findFirstEnabledItemInTheLastRow(items) {
  return __utils.findFirstEnabledItem(array.flatten2DArray(array.reverseArray(__utils.groupItemsByRows(items))));
}

function isItem(items, element) {
  if (!element) return false;
  return items.some(item => item.ref.current === element);
}

function useScheduleFocus(activeItem) {
  const [scheduled, setScheduled] = react.useState(false);
  const schedule = react.useCallback(() => setScheduled(true), []);
  react.useEffect(() => {
    const activeElement = activeItem == null ? void 0 : activeItem.ref.current;

    if (scheduled && activeElement) {
      setScheduled(false);
      activeElement.focus();
    }
  }, [activeItem, scheduled]);
  return schedule;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite widget.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useComposite({ state });
 * <Role {...props}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Role>
 * ```
 */


const useComposite = system.createHook(_ref => {
  let {
    state,
    composite = true,
    focusOnMove = true,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const virtualFocus = composite && state.virtualFocus;
  const activeItem = __utils.findEnabledItemById(state.items, state.activeId);
  const activeItemRef = hooks.useLiveRef(activeItem);
  const previousElementRef = react.useRef(null);
  const isSelfActive = state.activeId === null;
  const isSelfAciveRef = hooks.useLiveRef(isSelfActive);
  const scheduleFocus = useScheduleFocus(activeItem); // Focus on the active item element.

  hooks.useSafeLayoutEffect(() => {
    var _activeItemRef$curren;

    if (!focusOnMove) return;
    if (!state.moves) return;
    const itemElement = (_activeItemRef$curren = activeItemRef.current) == null ? void 0 : _activeItemRef$curren.ref.current;
    if (!itemElement) return; // We're scheduling the focus on the next tick to avoid the `onFocus`
    // event on each item to be triggered before the state changes can
    // propagate to them.

    scheduleFocus();
  }, [focusOnMove, state.moves]);
  react.useEffect(() => {
    if (!composite) return;
    if (!state.moves) return;
    if (!isSelfAciveRef.current) return;
    const element = ref.current; // When virtualFocus is enabled, calling composite.move(null) will not
    // fire a blur event on the active item. So we need to do it manually.

    const previousElement = previousElementRef.current;

    if (previousElement) {
      events.fireBlurEvent(previousElement, {
        relatedTarget: element
      });
    } // If composite.move(null) has been called, the composite container (this
    // element) should receive focus.


    element == null ? void 0 : element.focus(); // And we have to clean up the previous element ref so an additional blur
    // event is not fired on it, for example, when looping through items while
    // includesBaseElement is true.

    previousElementRef.current = null;
  }, [composite, state.moves]);
  const onKeyDownCapture = useKeyboardEventProxy(activeItem, props.onKeyDownCapture);
  const onKeyUpCapture = useKeyboardEventProxy(activeItem, props.onKeyUpCapture);
  const onFocusCaptureProp = hooks.useEventCallback(props.onFocusCapture);
  const onFocusCapture = react.useCallback(event => {
    onFocusCaptureProp(event);
    if (event.defaultPrevented) return;
    if (!virtualFocus) return;
    const previousActiveElement = event.relatedTarget;
    const previousActiveElementWasItem = isItem(state.items, previousActiveElement);

    if (events.isSelfTarget(event) && previousActiveElementWasItem) {
      // Composite has been focused as a result of an item receiving focus.
      // The composite item will move focus back to the composite container.
      // In this case, we don't want to propagate this additional event nor
      // call the onFocus handler passed to <Composite onFocus={...} />.
      event.stopPropagation(); // We keep track of the previous active item element so we can
      // manually fire a blur event on it later when the focus is moved to
      // another item on the onBlurCapture event below.

      previousElementRef.current = previousActiveElement;
    }
  }, [onFocusCaptureProp, virtualFocus, state.items]);
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    if (!composite) return;

    if (virtualFocus) {
      // This means that the composite element has been focused while the
      // composite item has not. For example, by clicking on the composite
      // element without touching any item, or by tabbing into the composite
      // element. In this case, we want to trigger focus on the item, just
      // like it would happen with roving tabindex. When it receives focus,
      // the composite item will move focus back to the composite element.
      if (events.isSelfTarget(event)) {
        var _activeItemRef$curren2;

        if ((_activeItemRef$curren2 = activeItemRef.current) != null && _activeItemRef$curren2.ref.current) {
          activeItemRef.current.ref.current.focus();
        } else {
          // If there's no active item, it might be because the state.items
          // haven't been populated yet, for example, when the composite
          // element is focused right after it gets mounted. So we schedule
          // a user focus and make another attempt in an effect when the
          // state.items is populated.
          scheduleFocus();
        }
      }
    } else if (events.isSelfTarget(event)) {
      // When the roving tabindex composite gets intentionally focused (for
      // example, by clicking directly on it, and not on an item), we make
      // sure to set the activeId to null (which means the composite element
      // itself has focus).
      state.setActiveId(null);
    }
  }, [onFocusProp, composite, virtualFocus, state.setActiveId]);
  const onBlurCaptureProp = hooks.useEventCallback(props.onBlurCapture);
  const onBlurCapture = react.useCallback(event => {
    onBlurCaptureProp(event);
    if (event.defaultPrevented) return;
    if (!virtualFocus) return; // When virtualFocus is set to true, we move focus from the composite
    // container (this element) to the composite item that is being
    // selected. Then we move focus back to the composite container. This is
    // so we can provide the same API as the roving tabindex method, which
    // means people can attach onFocus/onBlur handlers on the CompositeItem
    // component regardless of whether virtualFocus is set to true or false.
    // This sequence of blurring and focusing on items and on the composite
    // element may be confusing, so we ignore intermediate focus and blur
    // events by stopping their propagation.

    const activeElement = (activeItem == null ? void 0 : activeItem.ref.current) || null;
    const nextActiveElement = event.relatedTarget;
    const nextActiveElementIsItem = isItem(state.items, nextActiveElement); // This is an intermediate blur event: blurring the composite container
    // to focus on an item (nextActiveElement).

    if (events.isSelfTarget(event) && nextActiveElementIsItem) {
      // The next active element will be the same as the active item in the
      // state in these two scenarios:
      //   - Moving focus with keyboard: the state is updated before the
      //     blur event is triggered, so here the active item is already
      //     pointing to the next active element.
      //   - Clicking on the active item with a pointer: this will trigger
      //     blur on the composite element and then the next active element
      //     will be the same as the active item. Clicking on an item other
      //     than the active one doesn't end up here as the activeItem state
      //     will be updated only after that.
      if (nextActiveElement === activeElement) {
        const previousElement = previousElementRef.current; // If there's a previous active item and it's not a click action,
        // then we fire a blur event on it so it will work just like if it
        // had DOM focus before (like when using roving tabindex).

        if (previousElement && previousElement !== nextActiveElement) {
          events.fireBlurEvent(previousElement, event);
        }
      } // This will be true when the next active element is not the active
      // element, but there's an active item. This will only happen when
      // clicking with a pointer on a different item, when there's already
      // an item selected, in which case activeElement is the item that is
      // getting blurred, and nextActiveElement is the item that is being
      // clicked.
      else if (activeElement) {
        events.fireBlurEvent(activeElement, event);
      } // We want to ignore intermediate blur events, so we stop the
      // propagation of this event.


      event.stopPropagation();
    } else {
      const targetIsItem = isItem(state.items, event.target); // If target is not a composite item, it may be the composite element
      // itself (isSelfTarget) or a tabbable element inside the composite
      // element. This may be triggered by clicking outside of the composite
      // element or by tabbing out of it. In either cases, we want to fire a
      // blur event on the active item.

      if (!targetIsItem && activeElement) {
        events.fireBlurEvent(activeElement, event);
      }
    }
  }, [onBlurCaptureProp, virtualFocus, activeItem, state.items]);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const onKeyDown = react.useCallback(event => {
    var _findFirstEnabledItem;

    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    if (!events.isSelfTarget(event)) return;
    if (activeItemRef.current) return;
    const isVertical = state.orientation !== "horizontal";
    const isHorizontal = state.orientation !== "vertical";
    const isGrid = !!((_findFirstEnabledItem = __utils.findFirstEnabledItem(state.items)) != null && _findFirstEnabledItem.rowId);

    const up = () => {
      if (isGrid) {
        const item = state.items && findFirstEnabledItemInTheLastRow(state.items);
        return item == null ? void 0 : item.id;
      }

      return state.last();
    };

    const keyMap = {
      ArrowUp: (isGrid || isVertical) && up,
      ArrowRight: (isGrid || isHorizontal) && state.first,
      ArrowDown: (isGrid || isVertical) && state.first,
      ArrowLeft: (isGrid || isHorizontal) && state.last,
      Home: state.first,
      End: state.last,
      PageUp: state.first,
      PageDown: state.last
    };
    const action = keyMap[event.key];

    if (action) {
      const id = action();

      if (id !== undefined) {
        event.preventDefault();
        state.move(id);
      }
    }
  }, [onKeyDownProp, state.orientation, state.items, state.last, state.first, state.move]);
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.CompositeContext);
  const activeId = (activeItem == null ? void 0 : activeItem.id) || undefined;
  props = {
    "aria-activedescendant": virtualFocus ? activeId : undefined,
    ...props,
    ref: hooks.useForkRef(ref, composite ? state.baseRef : undefined, props.ref),
    onKeyDownCapture,
    onKeyUpCapture,
    onFocusCapture,
    onFocus,
    onBlurCapture,
    onKeyDown
  };
  const focusable = composite && (virtualFocus || state.activeId === null);
  props = focusable_focusable.useFocusable({
    focusable,
    ...props
  });
  return props;
});
/**
 * A component that renders a composite widget.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */

const Composite = system.createComponent(props => {
  const htmlProps = useComposite(props);
  return system.createElement("div", htmlProps);
});

exports.Composite = Composite;
exports.useComposite = useComposite;
