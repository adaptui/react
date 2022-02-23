import { useRef, useCallback, useEffect } from 'react';
import { isTextField, isButton } from 'ariakit-utils/dom';
import { isSelfTarget, isFocusEventOutside } from 'ariakit-utils/events';
import { restoreFocusIn, getFirstTabbableIn, disableFocusIn } from 'ariakit-utils/focus';
import { useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { queueMicrotask } from 'ariakit-utils/misc';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { C as CompositeContext, s as selectTextField } from '../__utils-7da92179.js';

// TODO: Add data-attribute to indicate whether it's expanded?

function getFirstTabbable(container) {
  restoreFocusIn(container);
  const tabbable = getFirstTabbableIn(container);
  disableFocusIn(container);
  return tabbable;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a container for interactive widgets inside
 * composite items. This should be used in conjunction with the `CompositeItem`
 * component, the `useCompositeItem` hook, or any other component/hook that uses
 * `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeContainer({ state });
 * <Composite state={state}>
 *   <CompositeItem {...props}>
 *     <input type="text" />
 *   </CompositeItem>
 * </Composite>
 * ```
 */


const useCompositeContainer = createHook(_ref => {
  var _state2, _state5, _state6;

  let {
    state,
    ...props
  } = _ref;
  state = useStore(state || CompositeContext, ["items", "baseRef", "setMoves"]);
  const ref = useRef(null);
  const isOpenRef = useRef(false);
  const open = useCallback(function (collapseToEnd) {
    if (collapseToEnd === void 0) {
      collapseToEnd = false;
    }

    const container = ref.current;
    if (!container) return;
    restoreFocusIn(container);
    const tabbable = getFirstTabbableIn(container);

    if (!tabbable) {
      disableFocusIn(container);
      return;
    }

    isOpenRef.current = true;
    queueMicrotask(() => {
      tabbable.focus();

      if (isTextField(tabbable) || tabbable.isContentEditable) {
        selectTextField(tabbable, collapseToEnd);
      }
    });
  }, []);
  const close = useCallback(() => {
    const container = ref.current;
    if (!container) return;
    isOpenRef.current = false;
    disableFocusIn(container);
  }, []); // Disable focus on the tabbable elements inside the container when the
  // container is mounted.

  useEffect(() => {
    var _state;

    const container = ref.current;
    if (!container) return;
    const isOpen = isOpenRef.current; // We need to wait for the items to be populated before we can disable
    // focus, so we consider edge cases where some tabbable elements become
    // disabled after the first render (for example, when rendering nested
    // composite elements).

    if (!isOpen && (_state = state) != null && _state.items.length) {
      disableFocusIn(container);
    }
  }, [(_state2 = state) == null ? void 0 : _state2.items]);
  const onFocusProp = useEventCallback(props.onFocus);
  const onFocus = useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    const isOpen = isOpenRef.current;

    if (isSelfTarget(event)) {
      var _state3;

      // The container element itself has received focus. Here we make an
      // additional step in case tabbable elements have been added lazily to
      // the DOM. We get all containers in the current composite element and
      // disable all tabbable elements inside them.
      isOpenRef.current = false;
      const composite = (_state3 = state) == null ? void 0 : _state3.baseRef.current;
      const selector = "[data-composite-container]";
      const containers = composite == null ? void 0 : composite.querySelectorAll(selector);
      containers == null ? void 0 : containers.forEach(container => disableFocusIn(container));
    } else if (!isOpen) {
      var _state4;

      // Otherwise, if any element inside the container has received focus,
      // for example, by a direct user click, we should act as the container
      // has been opened.
      isOpenRef.current = true;
      restoreFocusIn(event.currentTarget); // Resets the moves in the state so the composite item will not be
      // focused right after the focusable element inside the container gets
      // focus.

      (_state4 = state) == null ? void 0 : _state4.setMoves(0);
    }
  }, [onFocusProp, (_state5 = state) == null ? void 0 : _state5.baseRef, (_state6 = state) == null ? void 0 : _state6.setMoves]);
  const onBlurProp = useEventCallback(props.onBlur);
  const onBlur = useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;

    if (isFocusEventOutside(event)) {
      close();
    }
  }, [onBlurProp, close]);
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const onKeyDown = useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    if (event.altKey) return;
    if (event.ctrlKey) return;
    if (event.metaKey) return;
    if (event.shiftKey) return;
    const container = event.currentTarget;

    if (isSelfTarget(event)) {
      // Alphanumeric key on container: focus the first tabbable element in
      // the container if it's a text field or contenteditable element. This
      // will automatically replace the text field value with the pressed
      // key.
      if (event.key.length === 1 && event.key !== " ") {
        const tabbable = getFirstTabbable(container);
        if (!tabbable) return;

        if (isTextField(tabbable) || tabbable.isContentEditable) {
          event.stopPropagation();
          open();
        }
      } // Delete/Backspace on container: focus on the first tabbable element
      // in the container if it's a text field or contenteditable element.
      // This will automatically clear the text field value.
      else if (event.key === "Delete" || event.key === "Backspace") {
        const tabbable = getFirstTabbable(container);
        if (!tabbable) return;

        if (isTextField(tabbable) || tabbable.isContentEditable) {
          open(); // We need to move focus back to the container as soon as the
          // delete/backspace key is captured by the text field.

          const onInput = () => queueMicrotask(() => container.focus());

          container.addEventListener("input", onInput, {
            once: true
          });
        }
      }
    } // Escape on tabbable element inside container: move focus back to the
    // container.
    else if (event.key === "Escape") {
      queueMicrotask(() => container.focus());
    } // Enter on tabbable element inside container: move focus back to the
    // container only if it's an input or contenteditable element.
    else if (event.key === "Enter") {
      const target = event.target;
      const isInput = target.tagName === "INPUT" && !isButton(target) || target.tagName === "TEXTAREA";

      if (isInput || target.isContentEditable) {
        event.preventDefault();
        queueMicrotask(() => container.focus());
      }
    }
  }, [onKeyDownProp, open]);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;

    if (isSelfTarget(event) && !event.detail) {
      // Move focus to the first tabbable element in the container and place
      // at the end.
      open(true);
    }
  }, [onClickProp, open]);
  props = {
    "data-composite-container": "",
    ...props,
    ref: useForkRef(ref, props.ref),
    onFocus,
    onBlur,
    onKeyDown,
    onClick
  };
  return props;
});
/**
 * A component that renders a container for interactive widgets inside composite
 * items. This should be used in conjunction with the `CompositeItem` component
 * or a component that uses `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem as={CompositeContainer}>
 *     <input type="text" />
 *   </CompositeItem>
 * </Composite>
 * ```
 */

const CompositeContainer = createMemoComponent(props => {
  const htmlProps = useCompositeContainer(props);
  return createElement("div", htmlProps);
});

export { CompositeContainer, useCompositeContainer };
