import { useCallback, useRef, useContext, useMemo, useState } from 'react';
import { isTextField, isButton, getScrollingElement } from 'ariakit-utils/dom';
import { isPortalEvent, isSelfTarget } from 'ariakit-utils/events';
import { useId, useEventCallback, useBooleanEventCallback, useWrapElement, useForkRef, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { isSafari } from 'ariakit-utils/platform';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCollectionItem } from '../collection/collection-item.js';
import { useCommand } from '../command/command.js';
import { C as CompositeContext, i as CompositeRowContext, j as getContextId, k as CompositeItemContext, f as findEnabledItemById } from '../__utils-7da92179.js';
import { jsx } from 'react/jsx-runtime';

function isEditableElement(element) {
  if (element.isContentEditable) return true;
  if (isTextField(element)) return true;
  return element.tagName === "INPUT" && !isButton(element);
}

function getNextPageOffset(scrollingElement, pageUp) {
  if (pageUp === void 0) {
    pageUp = false;
  }

  const height = scrollingElement.clientHeight;
  const {
    top
  } = scrollingElement.getBoundingClientRect(); // Calculates the size of the page based on the scrolling element's height.
  // This is similar to how browsers calculate the scroll position when pressing
  // spacebar, page up, or page down.

  const pageSize = Math.max(height * 0.875, height - 40) * 1.5;
  const pageOffset = pageUp ? height - pageSize + top : pageSize + top;

  if (scrollingElement.tagName === "HTML") {
    return pageOffset + scrollingElement.scrollTop;
  }

  return pageOffset;
}

function getItemOffset(itemElement, pageUp) {
  if (pageUp === void 0) {
    pageUp = false;
  }

  const {
    top
  } = itemElement.getBoundingClientRect();

  if (pageUp) {
    // PageUp is always the inverse of PageDown. On PageDown, we consider only
    // the top offset of the element. On PageUp we need to add the height of the
    // element as well so we consider the bottom of it.
    return top + itemElement.clientHeight;
  }

  return top;
}

function findNextPageItemId(element, items, next, pageUp) {
  if (pageUp === void 0) {
    pageUp = false;
  }

  if (!items) return;
  if (!next) return;
  const scrollingElement = getScrollingElement(element);
  if (!scrollingElement) return;
  const nextPageOffset = getNextPageOffset(scrollingElement, pageUp);
  let id;
  let prevDifference; // We need to loop through the next items to find the one that is closest to
  // the next page offset.

  for (let i = 0; i < items.length; i += 1) {
    const previousId = id;
    id = next(i);
    if (!id) break;
    if (id === previousId) continue;
    const item = findEnabledItemById(items, id);
    const itemElement = item == null ? void 0 : item.ref.current;
    if (!itemElement) continue;
    const itemOffset = getItemOffset(itemElement, pageUp);
    const difference = itemOffset - nextPageOffset;
    const absDifference = Math.abs(difference); // On PageUp, the element is at the next page if the difference between its
    // top offset (plus its height) and the next page offset is less than or
    // equal zero. On PageDown, the difference should be greater than or equal
    // zero.

    if (pageUp && difference <= 0 || !pageUp && difference >= 0) {
      // There may be cases when there's a lot of space between the pages, for
      // example, when there's a lot of disabled items. In this case, the first
      // item in the next page might not be the closest one. So we return the
      // previous item id if its difference is less than the current one.
      if (prevDifference !== undefined && prevDifference < absDifference) {
        id = previousId;
      }

      break;
    }

    prevDifference = absDifference;
  }

  return id;
}

function useItem(items, id) {
  return useMemo(() => {
    if (!id) return;
    return items == null ? void 0 : items.find(item => item.id === id);
  }, [items, id]);
}

function targetIsAnotherItem(event, items) {
  if (isSelfTarget(event)) return false;
  const target = event.target;
  const {
    compositeItemId
  } = target.dataset;

  for (const item of items) {
    if (item.ref.current === event.currentTarget) continue;

    if (item.ref.current === target || compositeItemId === item.id) {
      return true;
    }
  }

  return false;
}

function useRole(ref, props) {
  const [role, setRole] = useState(props.role);
  useSafeLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    setRole(element.getAttribute("role") || props.role);
  }, [props.role]);
  return role;
}

function requiresAriaSelected(role) {
  return role === "option" || role === "treeitem";
}

function supportsAriaSelected(role) {
  if (role === "option") return true;
  if (role === "tab") return true;
  if (role === "treeitem") return true;
  if (role === "gridcell") return true;
  if (role === "row") return true;
  if (role === "columnheader") return true;
  if (role === "rowheader") return true;
  return false;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite item.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeItem({ state });
 * <Role {...props}>Item 1</Role>
 * ```
 */


const useCompositeItem = createHook(_ref => {
  var _state4, _state5, _state6, _state7, _state9, _state10, _state26, _state27, _state28, _state29, _state30, _state31, _state32, _state33, _state34, _state36, _state37, _state39, _state40;

  let {
    state,
    rowId: rowIdProp,
    preventScrollOnKeyDown = false,
    getItem: getItemProp,
    ...props
  } = _ref;
  const id = useId(props.id);
  state = useStore(state || CompositeContext, [useCallback(s => s.activeId === id, [id]), "baseRef", "items", "virtualFocus", "registerItem", "setActiveId", "orientation", "up", "next", "down", "previous", "first", "last", "move"]);
  const ref = useRef(null);
  const row = useContext(CompositeRowContext);
  const rowId = rowIdProp != null ? rowIdProp : getContextId(state, row);
  const trulyDisabled = props.disabled && !props.accessibleWhenDisabled;
  const getItem = useCallback(item => {
    const nextItem = { ...item,
      id,
      rowId,
      disabled: !!trulyDisabled
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, rowId, trulyDisabled, getItemProp]);
  const onFocusProp = useEventCallback(props.onFocus);
  const hasFocusedComposite = useRef(false);
  const onFocus = useCallback(event => {
    var _state, _state2, _state3;

    onFocusProp(event);
    if (event.defaultPrevented) return;
    if (isPortalEvent(event)) return;
    if (!id) return; // If the target is another item, this probably means that composite
    // items are nested. This is okay when building, for example, tree or
    // treegrid elements. In this case, we just ignore the focus event on
    // this parent item.

    if ((_state = state) != null && _state.items && targetIsAnotherItem(event, state.items)) return;
    (_state2 = state) == null ? void 0 : _state2.setActiveId(id); // When using aria-activedescendant, we want to make sure that the
    // composite container receives focus, not the composite item.

    if (!((_state3 = state) != null && _state3.virtualFocus)) return; // But we'll only do this if the focused element is the composite item
    // itself

    if (!isSelfTarget(event)) return; // and the composite item is not a text field or contenteditable
    // element.

    if (isEditableElement(event.currentTarget)) return;
    const composite = state.baseRef.current;
    if (!composite) return;

    if (isSafari()) {
      // Safari doesn't scroll into view automatically if the focus changes
      // so fast. So we need to do it manually.
      event.currentTarget.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    }

    hasFocusedComposite.current = true; // TODO: Experiment with queueMicrotask after testing the order of
    // the events.

    composite.focus();
  }, [onFocusProp, id, (_state4 = state) == null ? void 0 : _state4.items, (_state5 = state) == null ? void 0 : _state5.setActiveId, (_state6 = state) == null ? void 0 : _state6.virtualFocus, (_state7 = state) == null ? void 0 : _state7.baseRef]);
  const onBlurCaptureProp = useEventCallback(props.onBlurCapture);
  const onBlurCapture = useCallback(event => {
    var _state8;

    onBlurCaptureProp(event);
    if (event.defaultPrevented) return;

    if ((_state8 = state) != null && _state8.virtualFocus && hasFocusedComposite.current) {
      // When hasFocusedComposite is true, composite has been focused right
      // after focusing on this item. This is an intermediate blur event, so
      // we ignore it.
      hasFocusedComposite.current = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }, [onBlurCaptureProp, (_state9 = state) == null ? void 0 : _state9.virtualFocus]);
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const preventScrollOnKeyDownProp = useBooleanEventCallback(preventScrollOnKeyDown);
  const item = useItem((_state10 = state) == null ? void 0 : _state10.items, id);
  const isGrid = !!(item != null && item.rowId);
  const onKeyDown = useCallback(event => {
    var _state11, _state12, _state13, _state14, _state15, _state16;

    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    if (!isSelfTarget(event)) return;
    const isVertical = ((_state11 = state) == null ? void 0 : _state11.orientation) !== "horizontal";
    const isHorizontal = ((_state12 = state) == null ? void 0 : _state12.orientation) !== "vertical";
    const keyMap = {
      ArrowUp: (isGrid || isVertical) && ((_state13 = state) == null ? void 0 : _state13.up),
      ArrowRight: (isGrid || isHorizontal) && ((_state14 = state) == null ? void 0 : _state14.next),
      ArrowDown: (isGrid || isVertical) && ((_state15 = state) == null ? void 0 : _state15.down),
      ArrowLeft: (isGrid || isHorizontal) && ((_state16 = state) == null ? void 0 : _state16.previous),
      Home: () => {
        var _state18;

        if (!isGrid || event.ctrlKey) {
          var _state17;

          return (_state17 = state) == null ? void 0 : _state17.first();
        }

        return (_state18 = state) == null ? void 0 : _state18.previous(-1);
      },
      End: () => {
        var _state20;

        if (!isGrid || event.ctrlKey) {
          var _state19;

          return (_state19 = state) == null ? void 0 : _state19.last();
        }

        return (_state20 = state) == null ? void 0 : _state20.next(-1);
      },
      PageUp: () => {
        var _state21, _state22;

        return findNextPageItemId(event.currentTarget, (_state21 = state) == null ? void 0 : _state21.items, (_state22 = state) == null ? void 0 : _state22.up, true);
      },
      PageDown: () => {
        var _state23, _state24;

        return findNextPageItemId(event.currentTarget, (_state23 = state) == null ? void 0 : _state23.items, (_state24 = state) == null ? void 0 : _state24.down);
      }
    };
    const action = keyMap[event.key];

    if (action) {
      const nextId = action();

      if (preventScrollOnKeyDownProp(event) || nextId !== undefined) {
        var _state25;

        event.preventDefault();
        (_state25 = state) == null ? void 0 : _state25.move(nextId);
      }

      return;
    }
  }, [onKeyDownProp, (_state26 = state) == null ? void 0 : _state26.orientation, isGrid, (_state27 = state) == null ? void 0 : _state27.up, (_state28 = state) == null ? void 0 : _state28.next, (_state29 = state) == null ? void 0 : _state29.down, (_state30 = state) == null ? void 0 : _state30.items, (_state31 = state) == null ? void 0 : _state31.previous, (_state32 = state) == null ? void 0 : _state32.first, (_state33 = state) == null ? void 0 : _state33.last, preventScrollOnKeyDownProp, (_state34 = state) == null ? void 0 : _state34.move]);
  const providerValue = useMemo(() => {
    var _state35;

    return {
      id,
      baseRef: (_state35 = state) == null ? void 0 : _state35.baseRef
    };
  }, [id, (_state36 = state) == null ? void 0 : _state36.baseRef]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(CompositeItemContext.Provider, {
    value: providerValue,
    children: element
  }), [providerValue]);
  const isActiveItem = ((_state37 = state) == null ? void 0 : _state37.activeId) === id;
  const role = useRole(ref, props);
  let ariaSelected;

  if (isActiveItem) {
    var _state38;

    if (requiresAriaSelected(role)) {
      // When the active item role _requires_ the aria-selected attribute
      // (e.g., option, treeitem), we always set it to true.
      ariaSelected = true;
    } else if ((_state38 = state) != null && _state38.virtualFocus && supportsAriaSelected(role)) {
      // Otherwise, it will be set to true when virtualFocus is set to true
      // (meaning that the focus will be managed using the
      // aria-activedescendant attribute) and the aria-selected attribute is
      // _supported_ by the active item role.
      ariaSelected = true;
    }
  }

  const shouldTabIndex = !((_state39 = state) != null && _state39.virtualFocus) && isActiveItem || // We don't want to set tabIndex="-1" when using CompositeItem as a
  // standalone component, without state props.
  !((_state40 = state) != null && _state40.items.length);
  props = {
    id,
    "aria-selected": ariaSelected,
    "data-active-item": isActiveItem ? "" : undefined,
    ...props,
    ref: useForkRef(ref, props.ref),
    tabIndex: shouldTabIndex ? props.tabIndex : -1,
    onFocus,
    onBlurCapture,
    onKeyDown
  };
  props = useCommand(props);
  props = useCollectionItem({
    state,
    ...props,
    getItem,
    shouldRegisterItem: !!id ? props.shouldRegisterItem : false
  });
  return props;
});
/**
 * A component that renders a composite item.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 *   <CompositeItem>Item 3</CompositeItem>
 * </Composite>
 * ```
 */

const CompositeItem = createMemoComponent(props => {
  const htmlProps = useCompositeItem(props);
  return createElement("button", htmlProps);
});

export { CompositeItem, useCompositeItem };
