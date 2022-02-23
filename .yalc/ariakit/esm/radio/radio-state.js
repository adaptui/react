import { useMemo } from 'react';
import { useControlledState } from 'ariakit-utils/hooks';
import { useStorePublisher } from 'ariakit-utils/store';
import { useCompositeState } from '../composite/composite-state.js';

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
  const [value, setValue] = useControlledState((_props$defaultValue = props.defaultValue) != null ? _props$defaultValue : null, props.value, props.setValue);
  const composite = useCompositeState({
    focusLoop,
    ...props
  });
  const state = useMemo(() => ({ ...composite,
    value,
    setValue
  }), [composite, value, setValue]);
  return useStorePublisher(state);
}

export { useRadioState };
