import { useCallback } from 'react';
import { isTextField, getPopupRole } from 'ariakit-utils/dom';
import { hasFocus } from 'ariakit-utils/focus';
import { useEventCallback, useBooleanEventCallback, useWrapElement } from 'ariakit-utils/hooks';
import { queueMicrotask } from 'ariakit-utils/misc';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeHover } from '../composite/composite-hover.js';
import { useCompositeItem } from '../composite/composite-item.js';
import { C as ComboboxContext, a as ComboboxItemValueContext } from '../__utils-8b39082b.js';
import { jsx } from 'react/jsx-runtime';

const itemRoleByPopupRole = {
  listbox: "option",
  tree: "treeitem",
  grid: "gridcell"
};

function getItemRole(contentElement) {
  const popupRole = getPopupRole(contentElement);
  if (!popupRole) return;
  return itemRoleByPopupRole[popupRole];
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a combobox item.
 * @see https://ariakit.org/components/combobox
 * @example
 * ```jsx
 * const state = useComboboxState();
 * const props = useComboboxItem({ state, value: "value" });
 * <Role {...props} />
 * ```
 */


const useComboboxItem = createHook(_ref => {
  var _state4, _state5, _state6, _state9, _state10, _state11, _state12;

  let {
    state,
    value,
    hideOnClick = value != null,
    setValueOnClick = true,
    shouldRegisterItem = true,
    focusOnHover = false,
    getItem: getItemProp,
    ...props
  } = _ref;
  state = useStore(state || ComboboxContext, ["setValue", "move", "hide", "baseRef", "contentElement", "mounted"]);
  const getItem = useCallback(item => {
    const nextItem = { ...item,
      value
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [value, getItemProp]);
  const onClickProp = useEventCallback(props.onClick);
  const hideOnClickProp = useBooleanEventCallback(hideOnClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;

    if (setValueOnClick && value != null) {
      var _state;

      (_state = state) == null ? void 0 : _state.setValue(value);
    }

    if (hideOnClickProp(event)) {
      var _state2, _state3;

      // When ComboboxList is used instead of ComboboxPopover, state.hide()
      // does nothing. The focus will not be moved over to the combobox
      // input automatically. So we need to move manually here.
      (_state2 = state) == null ? void 0 : _state2.move(null);
      (_state3 = state) == null ? void 0 : _state3.hide();
    }
  }, [onClickProp, hideOnClickProp, value, setValueOnClick, (_state4 = state) == null ? void 0 : _state4.setValue, hideOnClick, (_state5 = state) == null ? void 0 : _state5.move, (_state6 = state) == null ? void 0 : _state6.hide]);
  const onKeyDownProp = useEventCallback(props.onKeyDown);
  const onKeyDown = useCallback(event => {
    var _state7;

    onKeyDownProp(event);
    if (event.defaultPrevented) return;
    const baseElement = (_state7 = state) == null ? void 0 : _state7.baseRef.current;
    if (!baseElement) return;
    if (hasFocus(baseElement)) return; // When the combobox is not working with virtual focus, the items will
    // receive DOM focus. Therefore, pressing printable keys will not fill
    // the text field. So we need to programmatically focus on the text
    // field when the user presses printable keys.

    const printable = event.key.length === 1;

    if (printable || event.key === "Backspace" || event.key === "Delete") {
      queueMicrotask(() => baseElement.focus());

      if (isTextField(baseElement)) {
        var _state8;

        // If the combobox element is a text field, we should update the
        // state value with the current's element value. This is necessary
        // because the value may temporarily change based on the currently
        // selected item, but it'll be reset to the original value when the
        // combobox input is focused.
        (_state8 = state) == null ? void 0 : _state8.setValue(baseElement.value);
      }
    }
  }, [onKeyDownProp, (_state9 = state) == null ? void 0 : _state9.baseRef, (_state10 = state) == null ? void 0 : _state10.setValue]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(ComboboxItemValueContext.Provider, {
    value: value,
    children: element
  }), [value]);
  props = {
    role: getItemRole((_state11 = state) == null ? void 0 : _state11.contentElement),
    children: value,
    ...props,
    onClick,
    onKeyDown
  };
  props = useCompositeItem({
    state,
    ...props,
    getItem,
    // We only register the item on the state when the popover is visible so
    // we don't try to move focus to hidden items when pressing arrow keys.
    shouldRegisterItem: ((_state12 = state) == null ? void 0 : _state12.mounted) && shouldRegisterItem
  });
  props = useCompositeHover({
    state,
    focusOnHover,
    ...props
  });
  return props;
});
/**
 * A component that renders a combobox item inside a combobox list or popover.
 * The `role` prop will be automatically set based on the `ComboboxList` or
 * `ComboboxPopover` own `role` prop. For example, if the `ComboboxPopover`
 * component's `role` prop is set to `listbox` (default), the `ComboboxItem`
 * `role` will be set to `option`. By default, the `value` prop will be rendered
 * as the children, but this can be overriden.
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

const ComboboxItem = createMemoComponent(props => {
  const htmlProps = useComboboxItem(props);
  return createElement("div", htmlProps);
});

export { ComboboxItem, useComboboxItem };
