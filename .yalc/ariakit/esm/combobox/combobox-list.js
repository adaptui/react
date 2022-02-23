import { useRef, useCallback } from 'react';
import { useId, useEventCallback, useForkRef } from 'ariakit-utils/hooks';
import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { C as ComboboxContext } from '../__utils-8b39082b.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox list.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxList({ state });
 * <Role {...props}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </Role>
 * ```
 */
const useComboboxList = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const ref = useRef(null);
  const id = useId(props.id);
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const onKeyDown = useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      state.move(null);
    }
  }, [onKeyDownProp, state.move]);
  props = useStoreProvider({
    state,
    ...props
  }, ComboboxContext);
  const style = state.mounted ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    role: "listbox",
    hidden: !state.mounted,
    ...props,
    ref: useForkRef(id ? state.setContentElement : null, ref, props.ref),
    style,
    onKeyDown
  };
  return props;
});
/**
 * A component that renders a combobox list. The `role` prop is set to `listbox`
 * by default, but can be overriden by any other valid combobox popup role
 * (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby` prop
 * is set to the combobox input element's `id` by default.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxList state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxList>
 * ```
 */

const ComboboxList = createComponent(props => {
  const htmlProps = useComboboxList(props);
  return createElement("div", htmlProps);
});

export { ComboboxList, useComboboxList };
