'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var __utils = require('../__utils-1c90dd00.js');

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
const useRadioGroup = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.RadioContextState);
  props = {
    role: "radiogroup",
    ...props
  };
  props = composite_composite.useComposite({
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

const RadioGroup = system.createComponent(props => {
  const htmlProps = useRadioGroup(props);
  return system.createElement("div", htmlProps);
});

exports.RadioGroup = RadioGroup;
exports.useRadioGroup = useRadioGroup;
