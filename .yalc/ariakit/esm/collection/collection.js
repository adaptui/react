import { useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { C as CollectionItemContext } from '../__utils-4a897e71.js';
import { jsx } from 'react/jsx-runtime';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. It receives the collection state through the `state` prop
 * and provides context for `CollectionItem` components.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const collection = useCollectionState();
 * const props = useCollection({ state });
 * <Role {...props}>
 *   <CollectionItem>Item 1</CollectionItem>
 *   <CollectionItem>Item 2</CollectionItem>
 *   <CollectionItem>Item 3</CollectionItem>
 * </Role>
 * ```
 */
const useCollection = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useWrapElement(props, element => /*#__PURE__*/jsx(CollectionItemContext.Provider, {
    value: state.registerItem,
    children: element
  }), [state.registerItem]);
  return props;
});
/**
 * A component that renders a simple wrapper for collection items. It receives
 * the collection state through the `state` prop and provides context for
 * `CollectionItem` components.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const collection = useCollectionState();
 * <Collection state={collection}>
 *   <CollectionItem>Item 1</CollectionItem>
 *   <CollectionItem>Item 2</CollectionItem>
 *   <CollectionItem>Item 3</CollectionItem>
 * </Collection>
 * ```
 */

const Collection = createComponent(props => {
  const htmlProps = useCollection(props);
  return createElement("div", htmlProps);
});

export { Collection, useCollection };
