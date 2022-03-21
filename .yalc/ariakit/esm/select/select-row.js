import { useContext } from 'react';
import { getPopupRole } from 'ariakit-utils/dom';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeRow } from '../composite/composite-row.js';
import { S as SelectContext } from '../__utils-ce9ba82e.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectRow({ state });
 * <SelectPopover state={state}>
 *   <Role {...props}>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </Role>
 * </SelectPopover>
 * ```
 */
const useSelectRow = createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  const context = useContext(SelectContext);
  state = state || context;
  const popupRole = getPopupRole((_state = state) == null ? void 0 : _state.contentElement);
  const role = popupRole === "grid" ? "row" : "presentation";
  props = {
    role,
    ...props
  };
  props = useCompositeRow({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a select row.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectRow>
 *     <SelectItem value="Apple" />
 *     <SelectItem value="Orange" />
 *   </SelectRow>
 *   <SelectRow>
 *     <SelectItem value="Banana" />
 *     <SelectItem value="Grape" />
 *   </SelectRow>
 * </SelectPopover>
 * ```
 */

const SelectRow = createComponent(props => {
  const htmlProps = useSelectRow(props);
  return createElement("div", htmlProps);
});

export { SelectRow, useSelectRow };
