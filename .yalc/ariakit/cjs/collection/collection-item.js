'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-5ea25699.js');

function identity(value) {
  return value;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. This hook will register the item in the collection state.
 * If this hook is used in a component that is wrapped by `Collection` or a
 * component that implements `useCollection`, there's no need to explicitly pass
 * the `state` prop.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const state = useCollectionState();
 * const props = useCollectionItem({ state });
 * <Role {...props}>Item</Role>
 * ```
 */


const useCollectionItem = system.createHook(_ref => {
  var _state;

  let {
    state,
    shouldRegisterItem = true,
    getItem = identity,
    ...props
  } = _ref;
  state = store.useStore(state, ["registerItem"]);
  const contextRegisterItem = react.useContext(__utils.CollectionItemContext);
  const registerItem = ((_state = state) == null ? void 0 : _state.registerItem) || contextRegisterItem;
  const ref = react.useRef(null);
  hooks.useSafeLayoutEffect(() => {
    if (!shouldRegisterItem) return;
    return registerItem == null ? void 0 : registerItem(getItem({
      ref
    }));
  }, [shouldRegisterItem, getItem, registerItem]);
  props = { ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  return props;
});
/**
 * A component that renders an item in a collection. The collection state can be
 * passed explicitly through the `state` prop or implicitly through the
 * `Collection` component.
 * @see https://ariakit.org/components/collection
 * @example
 * ```jsx
 * const state = useCollectionState();
 * <CollectionItem state={state}>Item 1</CollectionItem>
 * <CollectionItem state={state}>Item 2</CollectionItem>
 * <CollectionItem state={state}>Item 3</CollectionItem>
 * ```
 */

const CollectionItem = system.createComponent(props => {
  const htmlProps = useCollectionItem(props);
  return system.createElement("div", htmlProps);
});

exports.CollectionItem = CollectionItem;
exports.useCollectionItem = useCollectionItem;
