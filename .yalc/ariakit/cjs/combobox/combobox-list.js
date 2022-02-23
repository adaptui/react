'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-c0893fb8.js');

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
const useComboboxList = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      state.move(null);
    }
  }, [onKeyDownProp, state.move]);
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.ComboboxContext);
  const style = state.mounted ? props.style : { ...props.style,
    display: "none"
  };
  props = {
    id,
    role: "listbox",
    hidden: !state.mounted,
    ...props,
    ref: hooks.useForkRef(id ? state.setContentElement : null, ref, props.ref),
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

const ComboboxList = system.createComponent(props => {
  const htmlProps = useComboboxList(props);
  return system.createElement("div", htmlProps);
});

exports.ComboboxList = ComboboxList;
exports.useComboboxList = useComboboxList;
