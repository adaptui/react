import * as React from "react";

import {
  PopoverInitialState,
  usePopoverState,
  useCompositeState,
  CompositeInitialState,
  CompositeState,
  CompositeActions,
} from "reakit";

import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

type Value = {
  value: string;
  id: string;
};

type Values = Value[];

export type PickerState = CompositeState & {
  /**
   * The `value` attribute of the currently Selected Option.
   */
  selectedValue: string | number | undefined;
};

export type PickerActions = CompositeActions & {
  /**
   * Sets `value`.
   */
  setSelecteValue: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
};

export type PickerInitialState = CompositeInitialState &
  PopoverInitialState &
  Partial<Pick<PickerState, "selectedValue">>;

export function usePickerState(
  initialState: SealedInitialState<PickerInitialState> = {},
) {
  const {
    selectedValue: initialValue,
    placement = "bottom",
    gutter = 0,
    loop = true,
    ...sealed
  } = useSealedState(initialState);

  const [selectedValue, setSelectedValue] = React.useState(initialValue);
  const [values, setValues] = React.useState<Values>([]);

  const composite = useCompositeState({ ...sealed, loop });
  const popover = usePopoverState({
    ...sealed,
    placement,
    gutter,
  });

  React.useEffect(() => {
    if (composite.items) {
      const _values = composite.items.map(item => ({
        value: item.ref.current?.attributes.getNamedItem("value")?.value ?? "",
        id: item.id ?? "",
      }));

      setValues(_values);
    }
  }, [composite.items]);

  return {
    ...composite,
    ...popover,
    values,
    selectedValue,
    setSelectedValue,
  };
}

export type PickerStateReturn = ReturnType<typeof usePickerState>;
