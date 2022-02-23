import { useCallback } from 'react';
import { useEventCallback } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialogDisclosure } from '../dialog/dialog-disclosure.js';
import { jsx } from 'react/jsx-runtime';

const children = /*#__PURE__*/jsx("svg", {
  "aria-hidden": "true",
  display: "block",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.5pt",
  viewBox: "0 0 16 16",
  height: "1em",
  width: "1em",
  pointerEvents: "none",
  children: /*#__PURE__*/jsx("polyline", {
    points: "4,6 8,10 12,6"
  })
});
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox disclosure button.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxDisclosure({ state });
 * <Combobox state={state} />
 * <Role {...props} />
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */


const useComboboxDisclosure = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onMouseDownProp = useEventCallback(props.onMouseDown);
  const onMouseDown = useCallback(event => {
    onMouseDownProp(event); // We have to prevent the element from getting focused on mousedown.

    event.preventDefault(); // This will immediately move focus to the combobox input.

    state.move(null);
  }, [onMouseDownProp, state.move]);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    state.disclosureRef.current = state.baseRef.current;
  }, [onClickProp, state.baseRef, state.disclosureRef]);
  const label = state.visible ? "Hide popup" : "Show popup";
  props = {
    children,
    tabIndex: -1,
    "aria-label": label,
    ...props,
    onMouseDown,
    onClick
  }; // We're using DialogDisclosure, and not PopoverDisclosure, because
  // PopoverDisclosure will also update the `state.anchorRef` with the
  // disclosure element. We need to keep the combobox input as the anchorRef.

  props = useDialogDisclosure({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a combobox disclosure button that toggles the
 * combobox popover visibility when clicked.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxDisclosure state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */

const ComboboxDisclosure = createComponent(props => {
  const htmlProps = useComboboxDisclosure(props);
  return createElement("button", htmlProps);
});

export { ComboboxDisclosure, useComboboxDisclosure };
