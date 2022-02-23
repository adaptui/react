import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useComposite } from '../composite/composite.js';
import { R as RadioContextState } from '../__utils-6a5ab864.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a radio group element.
 * @see https://ariakit.org/components/radio
 * @example
 * ```jsx
 * const state = useRadioState();
 * const props = useRadioGroup({ state });
 * <Role {...props}>
 *   <Radio value="Apple" />
 *   <Radio value="Orange" />
 * </Role>
 * ```
 */
const useRadioGroup = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useStoreProvider({
    state,
    ...props
  }, RadioContextState);
  props = {
    role: "radiogroup",
    ...props
  };
  props = useComposite({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a radio group element.
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

const RadioGroup = createComponent(props => {
  const htmlProps = useRadioGroup(props);
  return createElement("div", htmlProps);
});

export { RadioGroup, useRadioGroup };
