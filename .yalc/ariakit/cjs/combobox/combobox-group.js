'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeGroup = require('../composite/composite-group.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox group.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxGroup({ state });
 * <Combobox state={state} />
 * <ComboboxPopover state={state}>
 *   <Role {...props}>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </Role>
 * </ComboboxPopover>
 * ```
 */
const useComboboxGroup = system.createHook(props => {
  props = composite_compositeGroup.useCompositeGroup(props);
  return props;
});
/**
 * A component that renders a combobox group.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={state} />
 * <ComboboxPopover state={state}>
 *   <ComboboxGroup>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </ComboboxGroup>
 * </ComboboxPopover>
 * ```
 */

const ComboboxGroup = system.createComponent(props => {
  const htmlProps = useComboboxGroup(props);
  return system.createElement("div", htmlProps);
});

exports.ComboboxGroup = ComboboxGroup;
exports.useComboboxGroup = useComboboxGroup;
