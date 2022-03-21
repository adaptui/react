import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeGroup } from '../composite/composite-group.js';

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
const useSelectGroup = createHook(props => {
  props = useCompositeGroup(props);
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

const SelectGroup = createComponent(props => {
  const htmlProps = useSelectGroup(props);
  return createElement("div", htmlProps);
});

export { SelectGroup, useSelectGroup };
