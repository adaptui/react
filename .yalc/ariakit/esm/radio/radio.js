import { useCallback, useRef, useEffect } from 'react';
import { useId, useLiveRef, useEventCallback, useTagName, useForkRef } from 'ariakit-utils/hooks';
import { useStore, createMemoComponent } from 'ariakit-utils/store';
import { createHook, createElement } from 'ariakit-utils/system';
import { useCompositeItem } from '../composite/composite-item.js';
import { R as RadioContextState } from '../__utils-6a5ab864.js';

function getIsChecked(value, stateValue) {
  if (stateValue === undefined) return;

  if (value != null && stateValue != null) {
    return stateValue === value;
  }

  return !!stateValue;
}

function isNativeRadio(tagName, type) {
  return tagName === "input" && (!type || type === "radio");
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio button element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const state = useRadioState();
 * const props = useRadio({ state, value: "Apple" });
 * <RadioGroup state={state}>
 *   <Role as="input" {...props} />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */


const useRadio = createHook(_ref => {
  var _state, _state2, _state4, _state6, _state8;

  let {
    state,
    value,
    checked,
    ...props
  } = _ref;
  const id = useId(props.id);
  state = useStore(state || RadioContextState, [useCallback(s => s.activeId === id, [id]), useCallback(s => s.value === value, [value]), "setActiveId", "setValue"]);
  const ref = useRef(null);
  const isActiveItemRef = useLiveRef(((_state = state) == null ? void 0 : _state.activeId) === id);
  const isChecked = checked != null ? checked : getIsChecked(value, (_state2 = state) == null ? void 0 : _state2.value); // When the radio state has a default value, we need to update the active id
  // to point to the checked element, otherwise it'll be the first item in the
  // list.

  useEffect(() => {
    if (!isActiveItemRef.current && isChecked) {
      var _state3;

      (_state3 = state) == null ? void 0 : _state3.setActiveId(id);
    }
  }, [isChecked, (_state4 = state) == null ? void 0 : _state4.setActiveId, id]);
  const onChangeProp = useEventCallback(props.onChange);
  const tagName = useTagName(ref, props.as || "input");
  const nativeRadio = isNativeRadio(tagName, props.type);
  const onChange = useCallback(event => {
    var _state5;

    if (props.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!nativeRadio) {
      event.currentTarget.checked = true;
    }

    onChangeProp(event);
    if (event.defaultPrevented) return;
    (_state5 = state) == null ? void 0 : _state5.setValue(value);
  }, [props.disabled, nativeRadio, onChangeProp, (_state6 = state) == null ? void 0 : _state6.setValue, value]);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (nativeRadio) return;
    onChange(event);
  }, [onClickProp, nativeRadio, onChange]);
  const onFocusProp = useEventCallback(props.onFocus);
  const onFocus = useCallback(event => {
    var _state7;

    onFocusProp(event);
    if (event.defaultPrevented) return;
    if (!nativeRadio) return;
    if (!((_state7 = state) != null && _state7.moves)) return;
    if (!isActiveItemRef.current) return;
    onChange(event);
  }, [onFocusProp, nativeRadio, (_state8 = state) == null ? void 0 : _state8.moves, onChange]);
  props = {
    id,
    role: !nativeRadio ? "radio" : undefined,
    type: nativeRadio ? "radio" : undefined,
    "aria-checked": isChecked,
    ...props,
    ref: useForkRef(ref, props.ref),
    onChange,
    onClick,
    onFocus
  };
  props = useCompositeItem({
    state,
    clickOnEnter: false,
    ...props
  });
  return {
    value: nativeRadio ? value : undefined,
    checked: isChecked,
    ...props
  };
});
/**
 * A component that renders a radio button element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const radio = useRadioState();
 * <RadioGroup state={radio}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */

const Radio = createMemoComponent(props => {
  const htmlProps = useRadio(props);
  return createElement("input", htmlProps);
});

export { Radio, useRadio };
