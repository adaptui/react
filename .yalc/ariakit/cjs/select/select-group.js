'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeGroup = require('../composite/composite-group.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select group.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectGroup({ state });
 * <Select state={state} />
 * <SelectPopover state={state}>
 *   <Role {...props}>
 *     <SelectGroupLabel>Fruits</SelectGroupLabel>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </Role>
 * </SelectPopover>
 * ```
 */
const useSelectGroup = system.createHook(props => {
  props = composite_compositeGroup.useCompositeGroup(props);
  return props;
});
/**
 * A component that renders a select group.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectGroup>
 *     <SelectGroupLabel>Fruits</SelectGroupLabel>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </SelectGroup>
 * </SelectPopover>
 * ```
 */

const SelectGroup = system.createComponent(props => {
  const htmlProps = useSelectGroup(props);
  return system.createElement("div", htmlProps);
});

exports.SelectGroup = SelectGroup;
exports.useSelectGroup = useSelectGroup;
