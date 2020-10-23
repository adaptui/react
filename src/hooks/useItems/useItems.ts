import * as React from "react";

import { Item } from "./types";
import { useAction } from "./useAction";
import { findDOMIndex } from "./findDOMIndex";
import { addItemAtIndex } from "./addItemAtIndex";
import { useIsUnmountedRef } from "./useIsUnmountedRef";
import { useSortBasedOnDOMPosition } from "./useSortBasedOnDOMPosition";

export const useItems = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  useSortBasedOnDOMPosition(items, setItems);

  const itemsRef = React.useRef<Item[]>(items);
  const hasGroupRef = React.useRef(false);

  // register/unregister may be called when this component is unmounted. We
  // store the unmounted state here so we don't update the state if it's true.
  // This only happens in a very specific situation.
  // See https://github.com/reakit/reakit/issues/650
  const isUnmountedRef = useIsUnmountedRef();

  const registerItem = useAction(item => {
    if (isUnmountedRef.current) return;

    if (item.groupId) {
      hasGroupRef.current = true;
    }
    const index = findDOMIndex(itemsRef.current, item);
    itemsRef.current = addItemAtIndex(itemsRef.current, item, index);
  });

  const unregisterItem = useAction(id => {
    if (isUnmountedRef.current) return;

    const nextItems = itemsRef.current.filter(item => item.id !== id);

    // The item isn't registered, so do nothing
    if (nextItems.length === itemsRef.current.length) return;
    itemsRef.current = nextItems;
  });

  // Update Items onload after getting the items
  React.useEffect(() => {
    setItems(itemsRef.current);
  }, []);

  // Update Items once more if there is a group which need
  React.useEffect(() => {
    if (hasGroupRef.current === true) {
      setItems(itemsRef.current);
      hasGroupRef.current = false;
    }
  }, [items]);

  return { items, registerItem, unregisterItem };
};
