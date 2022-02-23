'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeGroupLabel = require('../composite/composite-group-label.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a combobox group. This hook should be
 * used in a component that's wrapped with `ComboboxGroup` so the
 * `aria-labelledby` is correctly set on the combobox group element.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * // This component should be wrapped with ComboboxGroup
 * const props = useComboboxGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
const useComboboxGroupLabel = system.createHook(props => {
  props = composite_compositeGroupLabel.useCompositeGroupLabel(props);
  return props;
});
/**
 * A component that renders a label in a combobox group. This component should
 * be wrapped with `ComboboxGroup` so the `aria-labelledby` is correctly set on
 * the combobox group element.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxGroup>
 *     <ComboboxGroupLabel>Label</ComboboxGroupLabel>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *   </ComboboxGroup>
 * </ComboboxPopover>
 * ```
 */

const ComboboxGroupLabel = system.createComponent(props => {
  const htmlProps = useComboboxGroupLabel(props);
  return system.createElement("div", htmlProps);
});

exports.ComboboxGroupLabel = ComboboxGroupLabel;
exports.useComboboxGroupLabel = useComboboxGroupLabel;
