'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-5ea25699.js');
var jsxRuntime = require('react/jsx-runtime');

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
const useCollection = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.CollectionItemContext.Provider, {
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

const Collection = system.createComponent(props => {
  const htmlProps = useCollection(props);
  return system.createElement("div", htmlProps);
});

exports.Collection = Collection;
exports.useCollection = useCollection;
