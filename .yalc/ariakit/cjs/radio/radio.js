'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeItem = require('../composite/composite-item.js');
var __utils = require('../__utils-1c90dd00.js');

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


const useRadio = system.createHook(_ref => {
  var _state, _state2, _state4, _state6, _state8;

  let {
    state,
    value,
    checked,
    ...props
  } = _ref;
  const id = hooks.useId(props.id);
  state = store.useStore(state || __utils.RadioContextState, [react.useCallback(s => s.activeId === id, [id]), react.useCallback(s => s.value === value, [value]), "setActiveId", "setValue"]);
  const ref = react.useRef(null);
  const isActiveItemRef = hooks.useLiveRef(((_state = state) == null ? void 0 : _state.activeId) === id);
  const isChecked = checked != null ? checked : getIsChecked(value, (_state2 = state) == null ? void 0 : _state2.value); // When the radio state has a default value, we need to update the active id
  // to point to the checked element, otherwise it'll be the first item in the
  // list.

  react.useEffect(() => {
    if (!isActiveItemRef.current && isChecked) {
      var _state3;

      (_state3 = state) == null ? void 0 : _state3.setActiveId(id);
    }
  }, [isChecked, (_state4 = state) == null ? void 0 : _state4.setActiveId, id]);
  const onChangeProp = hooks.useEventCallback(props.onChange);
  const tagName = hooks.useTagName(ref, props.as || "input");
  const nativeRadio = isNativeRadio(tagName, props.type);
  const onChange = react.useCallback(event => {
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
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    onClickProp(event);
    if (event.defaultPrevented) return;
    if (nativeRadio) return;
    onChange(event);
  }, [onClickProp, nativeRadio, onChange]);
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
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
    ref: hooks.useForkRef(ref, props.ref),
    onChange,
    onClick,
    onFocus
  };
  props = composite_compositeItem.useCompositeItem({
    state,
    clickOnEnter: !nativeRadio,
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

const Radio = store.createMemoComponent(props => {
  const htmlProps = useRadio(props);
  return system.createElement("input", htmlProps);
});

exports.Radio = Radio;
exports.useRadio = useRadio;
