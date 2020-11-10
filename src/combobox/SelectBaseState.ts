import * as React from "react";
import { CompositeStateReturn, CompositeState, CompositeActions } from "reakit";
import { SetState } from "reakit-utils/ts";

import { Item } from "./helpers/types";

export function useSelectBaseState<T extends CompositeStateReturn>(
  composite: T,
  { value: initialValue = null }: SelectBaseInitialState = {},
): SelectBaseStateReturn<T> {
  const valuesById = React.useRef<Record<string, string | undefined>>({});
  const values = React.useRef<string[]>([]);

  const {
    items: compositeItems,
    registerItem: compositeRegisterItem,
    unregisterItem: compositeUnregisterItem,
  } = composite;

  const [value, setValue] = React.useState(initialValue);
  const selectedId = React.useMemo(
    () => (value ? valuesById.current[value] : null),
    [valuesById, value],
  );

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
      if (item.value && item.id) {
        valuesById.current[item.value] = item.id;
        values.current = [...values.current, item.value];
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
    values: values.current,
    selectedId,
    items,
    menuRole: "listbox",
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
   *
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
   * Initial value to be selected
   */
  values: string[];
  /**
   * Id of the item that is currently selected.
   */
  selectedId?: string | null;
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
