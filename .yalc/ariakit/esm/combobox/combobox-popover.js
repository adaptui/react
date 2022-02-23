import { matches } from 'ariakit-utils/dom';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopover } from '../popover/popover.js';
import { useComboboxList } from './combobox-list.js';

function isController(target) {
  if (!target) return false;

  if ("id" in target) {
    for (var _len = arguments.length, ids = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      ids[_key - 1] = arguments[_key];
    }

    const selector = ids.filter(Boolean).map(id => "[aria-controls=\"" + id + "\"]").join(", ");
    if (!selector) return false;
    return matches(target, selector);
  }

  return false;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox popover.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxPopover({ state });
 * <Role {...props}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </Role>
 * ```
 */


const useComboboxPopover = createHook(_ref => {
  let {
    state,
    tabIndex,
    hideOnInteractOutside = true,
    ...props
  } = _ref;
  props = useComboboxList({
    state,
    ...props
  });
  props = usePopover({
    state,
    autoFocusOnShow: false,
    autoFocusOnHide: false,
    finalFocusRef: state.baseRef,
    ...props,
    // Make sure we don't hide the popover when the user interacts with the
    // combobox cancel or the combobox disclosure buttons. They will have the
    // aria-controls attribute pointing to either the combobox input or the
    // comboobx popover elements.
    hideOnInteractOutside: event => {
      var _state$contentElement, _state$baseRef$curren;

      const contentId = (_state$contentElement = state.contentElement) == null ? void 0 : _state$contentElement.id;
      const baseId = (_state$baseRef$curren = state.baseRef.current) == null ? void 0 : _state$baseRef$curren.id;
      if (isController(event.target, contentId, baseId)) return false;
      const result = typeof hideOnInteractOutside === "function" ? hideOnInteractOutside(event) : hideOnInteractOutside;
      return result;
    }
  });
  return props;
});
/**
 * A component that renders a combobox popover. The `role` prop is set to
 * `listbox` by default, but can be overriden by any other valid combobox popup
 * role (`listbox`, `menu`, `tree`, `grid` or `dialog`). The `aria-labelledby`
 * prop is set to the combobox input element's `id` by default.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const combobox = useComboboxState();
 * <Combobox state={combobox} />
 * <ComboboxPopover state={combobox}>
 *   <ComboboxItem value="Item 1" />
 *   <ComboboxItem value="Item 2" />
 *   <ComboboxItem value="Item 3" />
 * </ComboboxPopover>
 * ```
 */

const ComboboxPopover = createComponent(props => {
  const htmlProps = useComboboxPopover(props);
  return createElement("div", htmlProps);
});

export { ComboboxPopover, useComboboxPopover };
