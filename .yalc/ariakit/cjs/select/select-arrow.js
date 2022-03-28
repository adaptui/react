'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var popover_popoverDisclosureArrow = require('../popover/popover-disclosure-arrow.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow pointing to the select popover position.
 * It's usually rendered inside the `Select` component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectArrow({ state });
 * <Select state={state}>
 *   {state.value}
 *   <Role {...props} />
 * </Select>
 * <SelectPopover state={state}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */
const useSelectArrow = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = popover_popoverDisclosureArrow.usePopoverDisclosureArrow({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders an arrow pointing to the select popover position.
 * It's usually rendered inside the `Select` component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select}>
 *   {select.value}
 *   <SelectArrow />
 * </Select>
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */

const SelectArrow = system.createComponent(props => {
  const htmlProps = useSelectArrow(props);
  return system.createElement("span", htmlProps);
});

exports.SelectArrow = SelectArrow;
exports.useSelectArrow = useSelectArrow;