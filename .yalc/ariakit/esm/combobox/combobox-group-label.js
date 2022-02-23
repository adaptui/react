import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeGroupLabel } from '../composite/composite-group-label.js';

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
const useComboboxGroupLabel = createHook(props => {
  props = useCompositeGroupLabel(props);
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

const ComboboxGroupLabel = createComponent(props => {
  const htmlProps = useComboboxGroupLabel(props);
  return createElement("div", htmlProps);
});

export { ComboboxGroupLabel, useComboboxGroupLabel };
