import * as React from "react";
import { CompositeStateReturn, CompositeState, CompositeActions } from "reakit";
import { SetState } from "reakit-utils/ts";

import { Item } from "./helpers/types";

export function useSelectBaseState<T extends CompositeStateReturn>(
  composite: T,
  { value: initialValue = null }: SelectBaseInitialState = {},
): SelectBaseStateReturn<T> {
  const valuesById = React.useRef<Record<string, string | undefined>>({});

  const {
    items: compositeItems,
    registerItem: compositeRegisterItem,
    unregisterItem: compositeUnregisterItem,
  } = composite;

  const currentValue = React.useMemo(
    () =>
      composite.currentId ? valuesById.current[composite.currentId] : undefined,
    [valuesById, composite.currentId],
  );

  const [value, setValue] = React.useState(initialValue);

  const items = React.useMemo(() => {
    compositeItems.forEach(item => {
      if (item.id) {
        (item as Item).value = valuesById.current[item.id];
      }
    });
    return compositeItems;
  }, [compositeItems]);

  const registerItem = React.useCallback(
    (item: Item) => {
      compositeRegisterItem(item);
      if (item.id) {
        valuesById.current[item.id] = item.value;
      }
    },
    [compositeRegisterItem],
  );

  const unregisterItem = React.useCallback(
    (id: string) => {
      compositeUnregisterItem(id);
      delete valuesById.current[id];
    },
    [compositeUnregisterItem],
  );

  return {
    ...composite,
    value,
    currentValue,
    items,
    menuRole: "listbox",
    visible: true,
    setValue,
    registerItem,
    unregisterItem,
  };
}

export type SelectBaseState<T extends CompositeState = CompositeState> = Omit<
  T,
  "items"
> & {
  /**
   * Lists all the select items with their `id`, DOM `ref`, `disabled` state,
   * `value` and `groupId` if any. This state is automatically updated when
   * `registerItem` and `unregisterItem` are called.
   * @example
   * const select = useSelectState();
   * select.items.forEach((item) => {
   *   console.log(item.value);
   * });
   */
  items: Item[];
  /**
   * Indicates the type of the suggestions popup.
   */
  menuRole: "listbox" | "tree" | "grid" | "dialog";
  /**
   * Initial value to be selected
   */
  value: string | null;
  /**
   * Value of the item that is currently selected.
   */
  currentValue?: string;
  /**
   * Whether the suggestions popup is visible or not.
   */
  visible: boolean;
};

export type SelectBaseActions<
  T extends CompositeActions = CompositeActions
> = Omit<T, "registerItem"> & {
  /**
   * Registers a select item.
   * @example
   * const ref = React.useRef();
   * const select = useSelectState();
   * React.useEffect(() => {
   *   select.registerItem({ ref, id: "id" });
   *   return () => select.unregisterItem("id");
   * });
   */
  registerItem: (item: Item) => void;
  /**
   * Sets `values`.
   */
  setValue: SetState<SelectBaseState["value"]>;
};

export type SelectBaseInitialState = Pick<Partial<SelectBaseState>, "value">;

export type SelectBaseStateReturn<
  T extends CompositeStateReturn
> = SelectBaseState<T> & SelectBaseActions<T>;
