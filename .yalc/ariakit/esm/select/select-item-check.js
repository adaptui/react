import { useContext } from 'react';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCheckboxCheck } from '../checkbox/checkbox-check.js';
import { c as SelectItemCheckedContext } from '../__utils-ce9ba82e.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkmark inside a `SelectItem` component. This
 * hook must be used in a component that's wrapped with `SelectItem` or the
 * `checked` prop must be explicitly passed to the component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const props = useSelectItemCheck({ checked: true });
 * <Role {...props} />
 * ```
 */
const useSelectItemCheck = createHook(_ref => {
  var _checked;

  let {
    state,
    checked,
    ...props
  } = _ref;
  const context = useContext(SelectItemCheckedContext);
  checked = (_checked = checked) != null ? _checked : context;
  props = useCheckboxCheck({ ...props,
    checked
  });
  return props;
});
/**
 * A component that renders a checkmark inside a `SelectItem` component. This
 * component must be wrapped with `SelectItem` or the `checked` prop must be
 * explicitly passed to the component.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple">
 *     <SelectItemCheck />
 *     Apple
 *   </SelectItem>
 *   <SelectItem value="Orange">
 *     <SelectItemCheck />
 *     Orange
 *   </SelectItem>
 * </SelectPopover>
 * ```
 */

const SelectItemCheck = createComponent(props => {
  const htmlProps = useSelectItemCheck(props);
  return createElement("span", htmlProps);
});

export { SelectItemCheck, useSelectItemCheck };
