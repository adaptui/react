'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var array = require('ariakit-utils/array');
var system = require('ariakit-utils/system');
var popover_popover = require('../popover/popover.js');
var __utils = require('../__utils-87932646.js');
var select_selectList = require('./select-list.js');

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

const useSelectPopover = system.createHook(_ref => {
  var _values;

  let {
    state,
    ...props
  } = _ref;
  const values = array.toArray(state.value);
  const value = (_values = values[values.length - 1]) != null ? _values : "";
  const [item, setItem] = react.useState(null); // Sets the initial focus ref.

  react.useEffect(() => {
    setItem(prevItem => {
      if (state.mounted && prevItem != null && prevItem.ref.current) return prevItem;
      const item = __utils.findEnabledItemByValue(state.items, value);
      return item || null;
    });
  }, [state.mounted, state.items, value]);
  props = select_selectList.useSelectList({
    state,
    ...props
  });
  props = popover_popover.usePopover({
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

const SelectPopover = system.createComponent(props => {
  const htmlProps = useSelectPopover(props);
  return system.createElement("div", htmlProps);
});

exports.SelectPopover = SelectPopover;
exports.useSelectPopover = useSelectPopover;
