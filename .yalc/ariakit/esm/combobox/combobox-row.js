import { useContext } from 'react';
import { getPopupRole } from 'ariakit-utils/dom';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCompositeRow } from '../composite/composite-row.js';
import { C as ComboboxContext } from '../__utils-8b39082b.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox row.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxRow({ state });
 * <ComboboxPopover state={state}>
 *   <Role {...props}>
 *     <ComboboxItem value="Item 1" />
 *     <ComboboxItem value="Item 2" />
 *     <ComboboxItem value="Item 3" />
 *   </Role>
 * </ComboboxPopover>
 * ```
 */
const useComboboxRow = createHook(_ref => {
  var _state;

  let {
    state,
    ...props
  } = _ref;
  const context = useContext(ComboboxContext);
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
 * A component that renders a combobox row.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxRow>
 *     <ComboboxItem value="Item 1.1" />
 *     <ComboboxItem value="Item 1.2" />
 *     <ComboboxItem value="Item 1.3" />
 *   </ComboboxRow>
 *   <ComboboxRow>
 *     <ComboboxItem value="Item 2.1" />
 *     <ComboboxItem value="Item 2.2" />
 *     <ComboboxItem value="Item 2.3" />
 *   </ComboboxRow>
 * </ComboboxPopover>
 * ```
 */

const ComboboxRow = createComponent(props => {
  const htmlProps = useComboboxRow(props);
  return createElement("div", htmlProps);
});

export { ComboboxRow, useComboboxRow };
