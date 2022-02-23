import { useContext, useRef, useMemo } from 'react';
import { useId, useWrapElement, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { C as CompositeContext, i as CompositeRowContext } from '../__utils-7da92179.js';
import { jsx } from 'react/jsx-runtime';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite row. Wrapping `CompositeItem`
 * elements within rows will create a two-dimensional composite widget, such as
 * a grid.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useCompositeRow({ state });
 * <Composite state={state}>
 *   <Role {...props}>
 *     <CompositeItem>Item 1</CompositeItem>
 *     <CompositeItem>Item 2</CompositeItem>
 *     <CompositeItem>Item 3</CompositeItem>
 *   </Role>
 * </Composite>
 * ```
 */
const useCompositeRow = createHook(_ref => {
  var _state2;

  let {
    state,
    ...props
  } = _ref;
  const context = useContext(CompositeContext);
  state = state || context;
  const ref = useRef(null);
  const id = useId(props.id);
  const providerValue = useMemo(() => {
    var _state;

    return {
      id,
      baseRef: (_state = state) == null ? void 0 : _state.baseRef
    };
  }, [id, (_state2 = state) == null ? void 0 : _state2.baseRef]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(CompositeRowContext.Provider, {
    value: providerValue,
    children: element
  }), [providerValue]);
  props = {
    id,
    ...props,
    ref: useForkRef(ref, props.ref)
  };
  return props;
});
/**
 * A component that renders a composite row. Wrapping `CompositeItem` elements
 * within `CompositeRow` will create a two-dimensional composite widget, such
 * as a grid.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeRow>
 *     <CompositeItem>Item 1.1</CompositeItem>
 *     <CompositeItem>Item 1.2</CompositeItem>
 *     <CompositeItem>Item 1.3</CompositeItem>
 *   </CompositeRow>
 *   <CompositeRow>
 *     <CompositeItem>Item 2.1</CompositeItem>
 *     <CompositeItem>Item 2.2</CompositeItem>
 *     <CompositeItem>Item 2.3</CompositeItem>
 *   </CompositeRow>
 * </Composite>
 * ```
 */

const CompositeRow = createComponent(props => {
  const htmlProps = useCompositeRow(props);
  return createElement("div", htmlProps);
});

export { CompositeRow, useCompositeRow };
