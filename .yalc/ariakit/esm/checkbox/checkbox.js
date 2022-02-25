import { useRef, useEffect, useCallback } from 'react';
import { useControlledState, useTagName, useEventCallback, useWrapElement, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCommand } from '../command/command.js';
import { C as CheckboxCheckedContext } from '../__utils-fdd6f8a4.js';
import { jsx } from 'react/jsx-runtime';

function getStateChecked(stateValue, elementValue) {
  if (stateValue === undefined) return;

  if (elementValue) {
    if (Array.isArray(stateValue)) {
      return stateValue.includes(elementValue);
    }

    return stateValue === elementValue;
  }

  if (Array.isArray(stateValue)) {
    return false;
  }

  if (typeof stateValue === "boolean") {
    return stateValue;
  }

  return false;
}

function setMixed(element, mixed) {
  if (mixed) {
    element.indeterminate = true;
  } else if (element.indeterminate) {
    element.indeterminate = false;
  }
}

function isNativeCheckbox(tagName, type) {
  return tagName === "input" && (!type || type === "checkbox");
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. If the element is not a native checkbox, the hook will
 * return additional props to make sure it's accessible.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * const props = useCheckbox({ as: "div" });
 * <Role {...props}>Accessible checkbox</Role>
 * ```
 */


const useCheckbox = createHook(_ref => {
  let {
    state,
    value,
    checked: checkedProp,
    defaultChecked,
    ...props
  } = _ref;
  const [checked, setChecked] = useControlledState(defaultChecked != null ? defaultChecked : false, checkedProp != null ? checkedProp : getStateChecked(state == null ? void 0 : state.value, value));
  const ref = useRef(null);
  const tagName = useTagName(ref, props.as || "input");
  const nativeCheckbox = isNativeCheckbox(tagName, props.type);
  const mixed = checked ? checked === "mixed" : undefined;
  const isChecked = checked === "mixed" ? false : checked;
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    setMixed(element, mixed);
    element.checked = isChecked;
  }, [mixed, isChecked]);
  const onChangeProp = useEventCallback(props.onChange);
  const onChange = useCallback(event => {
    if (props.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    setMixed(event.currentTarget, mixed);

    if (!nativeCheckbox) {
      // If the element is not a native checkbox, we need to manually update
      // its checked property.
      event.currentTarget.checked = !event.currentTarget.checked;
    }

    onChangeProp(event);
    if (event.defaultPrevented) return;
    const elementChecked = event.currentTarget.checked;
    setChecked(elementChecked);
    state == null ? void 0 : state.setValue(prevValue => {
      if (!value) return elementChecked;
      if (!Array.isArray(prevValue)) return value;
      if (elementChecked) return [...prevValue, value];
      return prevValue.filter(v => v !== value);
    });
  }, [props.disabled, mixed, nativeCheckbox, onChangeProp, setChecked, state == null ? void 0 : state.setValue, value]);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (nativeCheckbox) return; // @ts-ignore The onChange event expects a ChangeEvent, but here we need
    // to pass a MouseEvent.

    onChange(event);
  }, [onClickProp, onChange]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(CheckboxCheckedContext.Provider, {
    value: isChecked,
    children: element
  }), [isChecked]);
  props = {
    role: !nativeCheckbox ? "checkbox" : undefined,
    type: nativeCheckbox ? "checkbox" : undefined,
    "aria-checked": checked,
    ...props,
    ref: useForkRef(ref, props.ref),
    onChange,
    onClick
  };
  props = useCommand({
    clickOnEnter: !nativeCheckbox,
    ...props
  });
  return {
    value: nativeCheckbox ? value : undefined,
    checked: isChecked,
    ...props
  };
});
/**
 * A component that renders a native accessible checkbox. If another element is
 * passed to the `as` prop, this component will make sure the rendered element is
 * accessible.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * <Checkbox as="div">Accessible checkbox</Checkbox>
 * ```
 */

const Checkbox = createComponent(props => {
  const htmlProps = useCheckbox(props);
  return createElement("input", htmlProps);
});

export { Checkbox, useCheckbox };
