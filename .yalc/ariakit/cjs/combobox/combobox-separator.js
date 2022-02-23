'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var composite_compositeSeparator = require('../composite/composite-separator.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a separator element for combobox items.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxSeparator({ state });
 * <ComboboxPopover state={state}>
 *   <ComboboxItem value="Item 1" />
 *   <Role {...props} />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */
const useComboboxSeparator = system.createHook(props => {
  props = composite_compositeSeparator.useCompositeSeparator(props);
  return props;
});
/**
 * A component that renders a separator element for combobox items
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxSeparator />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */

const ComboboxSeparator = system.createComponent(props => {
  const htmlProps = useComboboxSeparator(props);
  return system.createElement("hr", htmlProps);
});

exports.ComboboxSeparator = ComboboxSeparator;
exports.useComboboxSeparator = useComboboxSeparator;
