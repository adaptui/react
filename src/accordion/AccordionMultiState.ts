import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { useControllableState } from "@chakra-ui/hooks";

import {
  AccordionBaseActions,
  AccordionBaseInitialState,
  AccordionBaseState,
  useAccordionBaseState,
} from "./AccordionBaseState";

export function useAccordionMultiState(
  props: AccordionMultiInitialState = {},
): AccordionMultiStateReturn {
  const { manual = true } = props;

  const { move, ...baseState } = useAccordionBaseState(props);

  const [selectedIds, setSelectedIds] = useControllableState({
    defaultValue: props?.defaultSelectedIds || [],
    value: props?.selectedIds,
    onChange: props?.onSelectedIdsChange,
  });

  const select = React.useCallback(
    (id: string | null) => {
      move(id);

      if (selectedIds.includes(id)) {
        setSelectedIds(prevIds => prevIds?.filter(pId => pId !== id));

        return;
      }

      setSelectedIds(prevIds => [...prevIds, id]);
    },

    [move, selectedIds, setSelectedIds],
  );

  return {
    selectedIds,
    setSelectedIds,
    select,
    manual,
    allowToggle: true,
    allowMultiple: true,
    move,
    ...baseState,
  };
}

type StringOrNull = string | null;

export type AccordionMultiState = AccordionBaseState & {
  /**
   * The current selected accordion's `id`.
   */
  selectedIds: StringOrNull[];

  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual: boolean;

  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle: boolean;

  /**
   * Allow to open multiple accordion items
   */
  allowMultiple: boolean;
};

export type AccordionMultiActions = AccordionBaseActions & {
  /**
   * Sets the value.
   */
  setSelectedIds: Dispatch<SetStateAction<StringOrNull[]>>;

  /**
   * Moves into and selects an accordion by its `id`.
   */
  select: AccordionBaseActions["move"];
};

export type AccordionMultiInitialState = Pick<
  Partial<AccordionMultiState>,
  "manual" | "selectedIds"
> &
  AccordionBaseInitialState & {
    /**
     * The initial value to be used, in uncontrolled mode
     * @default []
     */
    defaultSelectedIds?: StringOrNull[] | (() => StringOrNull[]);

    /**
     * The callback fired when the value changes
     */
    onSelectedIdsChange?: (value: StringOrNull[]) => void;

    /**
     * The function that determines if the state should be updated
     */
    shouldUpdate?: (prev: StringOrNull[], next: StringOrNull[]) => boolean;
  };

export type AccordionMultiStateReturn = AccordionMultiState &
  AccordionMultiActions;
