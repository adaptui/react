'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var array = require('ariakit-utils/array');
var dom = require('ariakit-utils/dom');
var hooks = require('ariakit-utils/hooks');

function isElementPreceding(a, b) {
  return Boolean(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}

function findDOMIndex(items, item) {
  const itemElement = item.ref.current;
  if (!itemElement) return -1;
  let length = items.length;
  if (!length) return -1; // Most of the times, the new item will be added at the end of the list, so we
  // do a findeIndex in reverse order, instead of wasting time searching the
  // index from the beginning.

  while (length--) {
    const currentItem = items[length];
    if (!(currentItem != null && currentItem.ref.current)) continue;

    if (isElementPreceding(currentItem.ref.current, itemElement)) {
      return length + 1;
    }
  }

  return -1;
}

function sortBasedOnDOMPosition(items) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort((_ref, _ref2) => {
    let [indexA, a] = _ref;
    let [indexB, b] = _ref2;
    const elementA = a.ref.current;
    const elementB = b.ref.current;
    if (!elementA || !elementB) return 0; // a before b

    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }

      return -1;
    } // a after b


    if (indexA < indexB) {
      isOrderDifferent = true;
    }

    return 1;
  });

  if (isOrderDifferent) {
    return pairs.map(_ref3 => {
      let [_, item] = _ref3;
      return item;
    });
  }

  return items;
}

function setItemsBasedOnDOMPosition(items, setItems) {
  const sortedItems = sortBasedOnDOMPosition(items);

  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}

function getCommonParent(items) {
  var _firstItem$ref$curren;

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  let parentElement = firstItem == null ? void 0 : (_firstItem$ref$curren = firstItem.ref.current) == null ? void 0 : _firstItem$ref$curren.parentElement;

  while (parentElement) {
    const parent = parentElement;

    if (lastItem && parent.contains(lastItem.ref.current)) {
      return parentElement;
    }

    parentElement = parentElement.parentElement;
  }

  return dom.getDocument(parentElement).body;
}

function useTimeoutObserver(items, setItems) {
  react.useEffect(() => {
    const callback = () => setItemsBasedOnDOMPosition(items, setItems);

    const timeout = setTimeout(callback);
    return () => clearTimeout(timeout);
  });
}

function useSortBasedOnDOMPosition(items, setItems) {
  // istanbul ignore else: JSDOM doesn't support IntersectionObverser
  // See https://github.com/jsdom/jsdom/issues/2032
  if (typeof IntersectionObserver !== "function") {
    useTimeoutObserver(items, setItems);
    return;
  }

  const previousItems = react.useRef([]);
  react.useEffect(() => {
    const callback = () => {
      const hasPreviousItems = !!previousItems.current.length;
      previousItems.current = items; // We don't want to sort items if items have been just registered.

      if (!hasPreviousItems) return;
      setItemsBasedOnDOMPosition(items, setItems);
    };

    const root = getCommonParent(items);
    const observer = new IntersectionObserver(callback, {
      root
    });
    items.forEach(item => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });
    return () => observer.disconnect();
  }, [items, setItems]);
}
/**
 * Provides state for the `Collection` components.
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


function useCollectionState(props) {
  if (props === void 0) {
    props = {};
  }

  const [items, setItems] = hooks.useControlledState([], props.items, props.setItems);
  useSortBasedOnDOMPosition(items, setItems);
  const registerItem = react.useCallback(item => {
    setItems(prevItems => {
      // Finds the item group based on the DOM hierarchy
      const index = findDOMIndex(prevItems, item);
      return array.addItemToArray(prevItems, item, index);
    });

    const unregisterItem = () => {
      setItems(prevItems => {
        const nextItems = prevItems.filter(_ref4 => {
          let {
            ref
          } = _ref4;
          return ref !== item.ref;
        });

        if (prevItems.length === nextItems.length) {
          // The item isn't registered, so do nothing
          return prevItems;
        }

        return nextItems;
      });
    };

    return unregisterItem;
  }, []);
  const state = react.useMemo(() => ({
    items,
    setItems,
    registerItem
  }), [items, setItems, registerItem]);
  return state;
}

exports.useCollectionState = useCollectionState;
