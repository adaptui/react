'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-57ccda4f.js');

function getValueLength(element) {
  if (dom.isTextField(element)) {
    return element.value.length;
  } else if (element.isContentEditable) {
    const range = dom.getDocument(element).createRange();
    range.selectNodeContents(element);
    return range.toString().length;
  }

  return 0;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an input as a composite item. This should be used
 * in conjunction with the `CompositeItem` component, the `useCompositeItem`
 * hook, or any other component/hook that uses `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeInput({ state });
 * <Composite state={state}>
 *   <CompositeItem {...props} />
 * </Composite>
 * ```
 */


const useCompositeInput = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onKeyDownCaptureProp = hooks.useEventCallback(props.onKeyDownCapture);
  const onKeyDownCapture = react.useCallback(event => {
    onKeyDownCaptureProp(event);
    if (event.defaultPrevented) return;
    const element = event.currentTarget;
    if (!element.isContentEditable && !dom.isTextField(element)) return;
    const selection = dom.getTextboxSelection(element);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (selection.end !== getValueLength(element)) {
        event.stopPropagation();
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      if (selection.start !== 0) {
        event.stopPropagation();
      }
    }
  }, [onKeyDownCaptureProp]);
  const onFocusProp = hooks.useEventCallback(props.onFocus);
  const onFocus = react.useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    __utils.selectTextField(event.currentTarget);
  }, [onFocusProp]);
  props = { ...props,
    onKeyDownCapture,
    onFocus
  };
  return props;
});
/**
 * A component that renders an input as a composite item. This should be used in
 * conjunction with the `CompositeItem` component or a component that uses
 * `CompositeItem` underneath.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem as={CompositeInput} />
 * </Composite>
 * ```
 */

const CompositeInput = system.createComponent(props => {
  const htmlProps = useCompositeInput(props);
  return system.createElement("input", htmlProps);
});

exports.CompositeInput = CompositeInput;
exports.useCompositeInput = useCompositeInput;
