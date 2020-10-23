import * as React from "react";

import { addItemAtIndex } from "./addItemAtIndex";
import { findDOMIndex } from "./findDOMIndex";
import { Item } from "./types";
import { useIsUnmountedRef } from "./useIsUnmountedRef";
import { useSortBasedOnDOMPosition } from "./useSortBasedOnDOMPosition";

export const useItems = () => {
  const itemsRef = React.useRef<Item[]>([]);

  const setItems = (items: Item[]) => {
    itemsRef.current = items;
  };

  useSortBasedOnDOMPosition(itemsRef.current, setItems);
  // register/unregister may be called when this component is unmounted. We
  // store the unmounted state here so we don't update the state if it's true.
  // This only happens in a very specific situation.
  // See https://github.com/reakit/reakit/issues/650
  const isUnmountedRef = useIsUnmountedRef();

  const registerItem = React.useCallback(
    item => {
      if (isUnmountedRef.current) return;

      const index = findDOMIndex(itemsRef.current, item);

      itemsRef.current = addItemAtIndex(itemsRef.current, item, index);
    },
    [isUnmountedRef],
  );

  const unregisterItem = React.useCallback(
    id => {
      if (isUnmountedRef.current) return;

      const nextItems = itemsRef.current.filter(item => item.id !== id);

      // The item isn't registered, so do nothing
      if (nextItems.length === itemsRef.current.length) {
        return;
      }

      itemsRef.current = nextItems;
    },
    [isUnmountedRef],
  );

  return { items: itemsRef.current, registerItem, unregisterItem };
};
