import { useState, useEffect } from 'react';
import { toArray } from 'ariakit-utils/array';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopover } from '../popover/popover.js';
import { a as findEnabledItemByValue } from '../__utils-ce9ba82e.js';
import { useSelectList } from './select-list.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select popover.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectPopover({ state });
 * <Role {...props}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </Role>
 * ```
 */

const useSelectPopover = createHook(_ref => {
  var _values;

  let {
    state,
    ...props
  } = _ref;
  const values = toArray(state.value);
  const value = (_values = values[values.length - 1]) != null ? _values : "";
  const [item, setItem] = useState(null); // Sets the initial focus ref.

  useEffect(() => {
    setItem(prevItem => {
      if (state.mounted && prevItem != null && prevItem.ref.current) return prevItem;
      const item = findEnabledItemByValue(state.items, value);
      return item || null;
    });
  }, [state.mounted, state.items, value]);
  props = useSelectList({
    state,
    ...props
  });
  props = usePopover({
    state,
    initialFocusRef: item == null ? void 0 : item.ref,
    ...props
  });
  return props;
});
/**
 * A component that renders a select popover. The `role` prop is set to
 * `listbox` by default, but can be overriden by any other valid select popup
 * role (`listbox`, `menu`, `tree`, `grid` or `dialog`).
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

const SelectPopover = createComponent(props => {
  const htmlProps = useSelectPopover(props);
  return createElement("div", htmlProps);
});

export { SelectPopover, useSelectPopover };
