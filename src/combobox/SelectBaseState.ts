import * as React from "react";
import { CompositeStateReturn, CompositeState, CompositeActions } from "reakit";
import { SetState } from "reakit-utils/ts";

import { Item } from "./helpers/types";

export function getIdFromValue(
  valuesById: ValuesById,
  selectedValue: string | null | undefined,
) {
  if (selectedValue == null) return null;

  const selectedOption = valuesById.find(
    option => option.value === selectedValue,
  );
  return selectedOption ? selectedOption.id : null;
}

function getValueFromId(
  valuesById: ValuesById,
  currentId: CompositeState["currentId"],
) {
  if (currentId == null) return;

  const selectedOption = valuesById.find(option => option.id === currentId);
  return selectedOption ? selectedOption.value : undefined;
}

export function useSelectBaseState<T extends CompositeStateReturn>(
  composite: T,
  { selectedValue: initialSelectedValue = null }: SelectBaseInitialState = {},
): SelectBaseStateReturn<T> {
  const valuesById = React.useRef<ValuesById>([]);
  const valuesRef = React.useRef<string[]>([]);

  const {
    items: compositeItems,
    registerItem: compositeRegisterItem,
    unregisterItem: compositeUnregisterItem,
  } = composite;

  const [selectedValue, setSelectedValue] = React.useState(
    initialSelectedValue,
  );
  const selectedId = React.useMemo(
    () => getIdFromValue(valuesById.current, selectedValue),
    [valuesById.current, selectedValue],
  );

  const currentValue = React.useMemo(
    () => getValueFromId(valuesById.current, composite.currentId),
    [valuesById.current, composite.currentId],
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
      if (item.id && item.value) {
        valuesById.current = [
          ...valuesById.current,
          { id: item.id, value: item.value },
        ];
        valuesRef.current = [...valuesRef.current, item.value];
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
    menuRole: "listbox",
    selectedValue,
    currentValue,
    values: valuesRef.current,
    valuesById: valuesById.current,
    selectedId,
    items,
    setSelectedValue,
    registerItem,
    unregisterItem,
  };
}

export type ValuesById = { id: string; value: string }[];

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
   * Options/values provided.
   * @default []
   */
  values: string[];
  /**
   * Initial value to be selected
   */
  valuesById: ValuesById;
  /**
   * Initial value to be selected
   */
  selectedValue: string | null;
  /**
   * Initial value to be selected
   */
  currentValue: string | undefined;
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
