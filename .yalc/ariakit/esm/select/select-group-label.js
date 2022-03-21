import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeGroupLabel } from '../composite/composite-group-label.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a select group. This hook must be used
 * in a component that's wrapped with `SelectGroup` so the `aria-labelledby`
 * prop is properly set on the select group element.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * // This component must be wrapped with SelectGroup
 * const props = useSelectGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
const useSelectGroupLabel = createHook(props => {
  props = useCompositeGroupLabel(props);
  return props;
});
/**
 * A component that renders a label in a select group. This component must be
 * wrapped with `SelectGroup` so the `aria-labelledby` prop is properly set
 * on the select group element.
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
 *   <SelectGroup>
 *     <SelectGroupLabel>Meat</SelectGroupLabel>
 *     <SelectItem value="Beef" />
 *     <SelectItem value="Chicken" />
 *   </SelectGroup>
 * </SelectPopover>
 * ```
 */

const SelectGroupLabel = createComponent(props => {
  const htmlProps = useSelectGroupLabel(props);
  return createElement("div", htmlProps);
});

export { SelectGroupLabel, useSelectGroupLabel };
