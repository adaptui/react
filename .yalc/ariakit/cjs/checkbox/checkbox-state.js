'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');

/**
 * Provides state for the `Checkbox` component.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * const checkbox = useCheckboxState({ defaultChecked: true });
 * <Checkbox state={checkbox} />
 * ```
 */
function useCheckboxState(props) {
  var _props$defaultValue;

  if (props === void 0) {
    props = {};
  }

  const [value, setValue] = hooks.useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : false, props.value, props.setValue);
  const state = react.useMemo(() => ({
    value,
    setValue
  }), [value, setValue]);
  return state;
}

exports.useCheckboxState = useCheckboxState;
