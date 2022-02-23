import { useCallback } from 'react';
import { isTextField, getTextboxSelection, getDocument } from 'ariakit-utils/dom';
import { useEventCallback } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { s as selectTextField } from '../__utils-7da92179.js';

function getValueLength(element) {
  if (isTextField(element)) {
    return element.value.length;
  } else if (element.isContentEditable) {
    const range = getDocument(element).createRange();
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


const useCompositeInput = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onKeyDownCaptureProp = useEventCallback(props.onKeyDownCapture);
  const onKeyDownCapture = useCallback(event => {
    onKeyDownCaptureProp(event);
    if (event.defaultPrevented) return;
    const element = event.currentTarget;
    if (!element.isContentEditable && !isTextField(element)) return;
    const selection = getTextboxSelection(element);

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
  const onFocusProp = useEventCallback(props.onFocus);
  const onFocus = useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return;
    selectTextField(event.currentTarget);
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

const CompositeInput = createComponent(props => {
  const htmlProps = useCompositeInput(props);
  return createElement("input", htmlProps);
});

export { CompositeInput, useCompositeInput };
