import { useCallback } from 'react';
import { getPopupRole } from 'ariakit-utils/dom';
import { useEventCallback, useBooleanEventCallback, useWrapElement } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeHover } from '../composite/composite-hover.js';
import { useCompositeItem } from '../composite/composite-item.js';
import { S as SelectContext, c as SelectItemCheckedContext } from '../__utils-ce9ba82e.js';
import { jsx } from 'react/jsx-runtime';

const itemRoleByPopupRole = {
  listbox: "option",
  tree: "treeitem",
  grid: "gridcell"
};

function isSelected(stateValue, itemValue) {
  if (stateValue == null) return false;
  if (itemValue == null) return false;

  if (Array.isArray(stateValue)) {
    return stateValue.includes(itemValue);
  }

  return stateValue === itemValue;
}

function getItemRole(contentElement) {
  const popupRole = getPopupRole(contentElement);
  if (!popupRole) return;
  return itemRoleByPopupRole[popupRole];
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a select item.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const state = useSelectState();
 * const props = useSelectItem({ state, value: "Apple" });
 * <Role {...props} />
 * ```
 */


const useSelectItem = createHook(_ref => {
  var _state, _hideOnClick, _state4, _state5, _state6, _state7;

  let {
    state,
    value,
    getItem: getItemProp,
    hideOnClick,
    setValueOnClick = value != null,
    preventScrollOnKeyDown = true,
    focusOnHover = true,
    ...props
  } = _ref;
  state = useStore(state || SelectContext, [useCallback(s => isSelected(s.value, value), [value]), "setValue", "hide", "contentElement", "visible"]);
  const disabled = props.disabled;
  const getItem = useCallback(item => {
    // When the item is disabled, we don't register its value.
    const nextItem = { ...item,
      value: disabled ? undefined : value
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [disabled, value, getItemProp]);
  const multiSelectable = Array.isArray((_state = state) == null ? void 0 : _state.value);
  hideOnClick = (_hideOnClick = hideOnClick) != null ? _hideOnClick : value != null && !multiSelectable;
  const onClickProp = useEventCallback(props.onClick);
  const setValueOnClickProp = useBooleanEventCallback(setValueOnClick);
  const hideOnClickProp = useBooleanEventCallback(hideOnClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;

    if (setValueOnClickProp(event) && value != null) {
      var _state2;

      (_state2 = state) == null ? void 0 : _state2.setValue(prevValue => {
        if (!Array.isArray(prevValue)) return value;

        if (prevValue.includes(value)) {
          return prevValue.filter(v => v !== value);
        }

        return [...prevValue, value];
      });
    }

    if (hideOnClickProp(event)) {
      var _state3;

      (_state3 = state) == null ? void 0 : _state3.hide();
    }
  }, [onClickProp, value, setValueOnClickProp, (_state4 = state) == null ? void 0 : _state4.setValue, hideOnClickProp, (_state5 = state) == null ? void 0 : _state5.hide]);
  const selected = isSelected((_state6 = state) == null ? void 0 : _state6.value, value);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(SelectItemCheckedContext.Provider, {
    value: selected,
    children: element
  }), [selected]);
  props = {
    role: getItemRole((_state7 = state) == null ? void 0 : _state7.contentElement),
    "aria-selected": selected,
    children: value,
    ...props,
    onClick
  };
  props = useCompositeItem({
    state,
    getItem,
    preventScrollOnKeyDown,
    ...props
  });
  const focusOnHoverProp = useBooleanEventCallback(focusOnHover);
  props = useCompositeHover({
    state,
    ...props,
    // We have to disable focusOnHover when the popup is closed, otherwise
    // the active item will change to null (the container) when the popup is
    // closed by clicking on an item.
    focusOnHover: event => {
      var _state8;

      if (!focusOnHoverProp(event)) return false;
      return !!((_state8 = state) != null && _state8.visible);
    }
  });
  return props;
});
/**
 * A component that renders a select item inside a select list or select
 * popover. The `role` prop will be automatically set based on the `SelectList`
 * or `SelectPopover` own `role` prop. For example, if the `SelectPopover`
 * component's `role` prop is set to `listbox` (default), the `SelectItem`
 * `role` will be set to `option`. By default, the `value` prop will be rendered
 * as the children, but this can be overriden.
 * @see https://ariakit.org/components/select
 * @example
 * ```jsx
 * const select = useSelectState();
 * <Select state={select} />
 * <SelectPopover state={select}>
 *   <SelectItem value="Apple" />
 *   <SelectItem value="Orange" />
 * </SelectPopover>
 * ```
 */

const SelectItem = createMemoComponent(props => {
  const htmlProps = useSelectItem(props);
  return createElement("div", htmlProps);
});

export { SelectItem, useSelectItem };
