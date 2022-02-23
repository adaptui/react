import { useRef, useState, useCallback } from 'react';
import { useSafeLayoutEffect, useEventCallback, useBooleanEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useButton } from '../button/button.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that controls the visibility of a
 * disclosure content element.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const state = useDisclosureState();
 * const props = useDisclosure({ state });
 * <Role {...props}>Disclosure</Role>
 * <DisclosureContent state={state}>Content</DisclosureContent>
 * ```
 */
const useDisclosure = createHook(_ref => {
  var _state$contentElement;

  let {
    state,
    toggleOnClick = true,
    ...props
  } = _ref;
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false); // Assigns the disclosureRef whenever it's undefined or disconnected from
  // the DOM. If this disclosure element is the disclosureRef, this element
  // will get the `aria-expanded` attribute set to `true` when the disclosure
  // content is visible.

  useSafeLayoutEffect(() => {
    const currentDisclosure = state.disclosureRef.current;

    if (!currentDisclosure || !currentDisclosure.isConnected) {
      state.disclosureRef.current = ref.current;
    }

    const isCurrentDisclosure = state.disclosureRef.current === ref.current;
    setExpanded(state.visible && isCurrentDisclosure);
  }, [state.disclosureRef, state.visible]);
  const onMouseDownProp = useEventCallback(props.onMouseDown);
  const onMouseDown = useCallback(event => {
    state.disclosureRef.current = event.currentTarget;
    onMouseDownProp(event);
  }, [onMouseDownProp, state.disclosureRef]);
  const onClickProp = useEventCallback(props.onClick);
  const toggleOnClickProp = useBooleanEventCallback(toggleOnClick);
  const isDuplicate = ("data-disclosure" in props);
  const onClick = useCallback(event => {
    state.disclosureRef.current = event.currentTarget;
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (isDuplicate) return;
    if (!toggleOnClickProp(event)) return;
    state.toggle();
  }, [state.disclosureRef, onClickProp, isDuplicate, toggleOnClickProp, state.toggle]);
  props = {
    "data-disclosure": "",
    "aria-expanded": expanded,
    "aria-controls": (_state$contentElement = state.contentElement) == null ? void 0 : _state$contentElement.id,
    ...props,
    ref: useForkRef(ref, props.ref),
    onMouseDown,
    onClick
  };
  props = useButton(props);
  return props;
});
/**
 * A component that renders an element that controls the visibility of a
 * disclosure content element.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */

const Disclosure = createComponent(props => {
  const htmlProps = useDisclosure(props);
  return createElement("button", htmlProps);
});

export { Disclosure, useDisclosure };
