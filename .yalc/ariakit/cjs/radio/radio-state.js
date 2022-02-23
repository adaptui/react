'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var composite_compositeState = require('../composite/composite-state.js');

/**
 * Provides state for the `Radio` components.
 * @example
 * ```jsx
 * const radio = useRadioState();
 * <RadioGroup state={radio}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </RadioGroup>
 * ```
 */

function useRadioState(_temp) {
  var _props$defaultValue;

  let {
    focusLoop = true,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [value, setValue] = hooks.useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : null, props.value, props.setValue);
  const composite = composite_compositeState.useCompositeState({
    focusLoop,
    ...props
  });
  const state = react.useMemo(() => ({ ...composite,
    value,
    setValue
  }), [composite, value, setValue]);
  return store.useStorePublisher(state);
}

exports.useRadioState = useRadioState;
