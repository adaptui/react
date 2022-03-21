import { useRef, useState, useEffect, useCallback } from 'react';
import { isSelfTarget } from 'ariakit-utils/events';
import { useId, useEventCallback, useBooleanEventCallback, useRefId, useForkRef } from 'ariakit-utils/hooks';
import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useComposite } from '../composite/composite.js';
import { useCompositeTypeahead } from '../composite/composite-typeahead.js';
import { S as SelectContext } from '../__utils-ce9ba82e.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select list.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectList({ state });
 * <Role {...props}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </Role>
 * ```
 */
const useSelectList = createHook(_ref => {
  let {
    state,
    resetOnEscape = true,
    hideOnEnter = true,
    focusOnMove = true,
    composite = true,
    ...props
  } = _ref;
  const ref = useRef(null);
  const id = useId(props.id);
  const [defaultValue, setDefaultValue] = useState(state.value);
  const multiSelectable = Array.isArray(state.value); // Stores the intial value so we can reset it later when Escape is pressed

  useEffect(() => {
    if (state.mounted) return;
    setDefaultValue(state.value);
  }, [state.mounted, state.value]);
  resetOnEscape = resetOnEscape && !multiSelectable;
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const resetOnEscapeProp = useBooleanEventCallback(resetOnEscape);
  const hideOnEnterProp = useBooleanEventCallback(hideOnEnter);
  const onKeyDown = useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape" && resetOnEscapeProp(event)) {
      state.setValue(defaultValue);
    }

    if (event.key === " " || event.key === "Enter") {
      if (isSelfTarget(event) && hideOnEnterProp(event)) {
        event.preventDefault();
        state.hide();
      }
    }
  }, [onKeyDownProp, resetOnEscapeProp, state.setValue, defaultValue, hideOnEnterProp, state.hide]);
  props = useStoreProvider({
    state,
    ...props
  }, SelectContext);
  const labelId = useRefId(state.labelRef);
  const style = state.mounted ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    role: composite ? "listbox" : undefined,
    hidden: !state.mounted,
    "aria-labelledby": labelId,
    "aria-multiselectable": multiSelectable ? true : undefined,
    ...props,
    ref: useForkRef(id ? state.setContentElement : null, ref, props.ref),
    style,
    onKeyDown
  };
  props = useComposite({
    state,
    ...props,
    composite,
    focusOnMove: state.visible && !state.animating && focusOnMove
  });
  props = useCompositeTypeahead({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a select list. The `role` prop is set to `listbox`
 * by default, but can be overriden by any other valid select popup role
 * (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby` prop
 * is set to the select input element's `id` by default.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectList state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectList>
 * ```
 */

const SelectList = createComponent(props => {
  const htmlProps = useSelectList(props);
  return createElement("div", htmlProps);
});

export { SelectList, useSelectList };
