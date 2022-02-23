import { useMemo } from 'react';
import { useControlledState } from 'ariakit-utils/hooks';

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

  const [value, setValue] = useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : false, props.value, props.setValue);
  const state = useMemo(() => ({
    value,
    setValue
  }), [value, setValue]);
  return state;
}

export { useCheckboxState };
