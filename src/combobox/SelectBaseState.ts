import * as React from "react";
import { CompositeStateReturn, CompositeState, CompositeActions } from "reakit";
import { SetState } from "reakit-utils/ts";

import { Item } from "./helpers/types";

export function useSelectBaseState<T extends CompositeStateReturn>(
  composite: T,
  { selectedValue: initialSelectedValue = null }: SelectBaseInitialState = {},
): SelectBaseStateReturn<T> {
  const valuesWithId = React.useRef<Record<string, string | undefined>>({});
  const values = React.useRef<string[]>([]);

  const {
    items: compositeItems,
    registerItem: compositeRegisterItem,
    unregisterItem: compositeUnregisterItem,
  } = composite;

  const [selectedValue, setSelectedValue] = React.useState(
    initialSelectedValue,
  );
  const selectedId = React.useMemo(
    () => (selectedValue ? valuesWithId.current[selectedValue] : null),
    [valuesWithId, selectedValue],
  );

  const items = React.useMemo(() => {
    compositeItems.forEach(item => {
      if (item.id) {
        (item as Item).value = valuesWithId.current[item.id];
      }
    });
    return compositeItems;
  }, [compositeItems]);

  const registerItem = React.useCallback(
    (item: Item) => {
      compositeRegisterItem(item);
      if (item.value && item.id) {
        valuesWithId.current[item.value] = item.id;
        values.current = [...values.current, item.value];
      }
    },
    [compositeRegisterItem],
  );

  const unregisterItem = React.useCallback(
    (id: string) => {
      compositeUnregisterItem(id);
      delete valuesWithId.current[id];
    },
    [compositeUnregisterItem],
  );

  return {
    ...composite,
    menuRole: "listbox",
    selectedValue,
    values: values.current,
    valuesWithId: valuesWithId.current,
    selectedId,
    items,
    setSelectedValue,
    registerItem,
    unregisterItem,
  };
}

export type SelectBaseState<T extends CompositeState = CompositeState> = Omit<
  T,
  "items"
> & {
  /**
   * Indicates the type of the suggestions popup.
   */
  menuRole: "listbox" | "tree" | "grid" | "dialog";
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
   * Initial value to be selected
   */
  values: string[];
  /**
   * Initial value to be selected
   */
  valuesWithId: Record<string, string | undefined>;
  /**
   * Initial value to be selected
   */
  selectedValue: string | null;
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
  setSelectedValue: SetState<SelectBaseState["selectedValue"]>;
};

export type SelectBaseInitialState = Pick<
  Partial<SelectBaseState>,
  "selectedValue"
>;

export type SelectBaseStateReturn<
  T extends CompositeStateReturn
> = SelectBaseState<T> & SelectBaseActions<T>;
