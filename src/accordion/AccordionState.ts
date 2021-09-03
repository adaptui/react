import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { useControllableState } from "@chakra-ui/hooks";

import {
  AccordionBaseActions,
  AccordionBaseInitialState,
  AccordionBaseState,
  useAccordionBaseState,
} from "./AccordionBaseState";
import { StringOrNull } from "./helpers";

export function useAccordionState(
  props: AccordionInitialState = {},
): AccordionStateReturn {
  const { manual = true, allowToggle = false } = props;
  const { move, ...baseState } = useAccordionBaseState(props);

  const [selectedId, setSelectedId] = useControllableState({
    defaultValue: props?.defaultSelectedId || null,
    value: props?.selectedId,
    onChange: props?.onSelectedIdChange,
  });

  const select = React.useCallback(
    (id: string) => {
      move(id);

      if (allowToggle && id === selectedId) {
        setSelectedId(null);
        return;
      }

      setSelectedId(id);
    },

    [move, allowToggle, selectedId, setSelectedId],
  );

  return {
    selectedId,
    setSelectedId,
    select,
    manual,
    allowToggle,
    allowMultiple: false,
    move,
    ...baseState,
  };
}

export type AccordionState = AccordionBaseState & {
  /**
   * The current selected accordion's `id`.
   */
  selectedId: StringOrNull;

  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle: boolean;

  /**
   * Allow to open multiple accordion items
   */
  allowMultiple: boolean;

  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual: boolean;
};

export type AccordionActions = AccordionBaseActions & {
  /**
   * Sets the value.
   */
  setSelectedId: Dispatch<SetStateAction<StringOrNull>>;

  /**
   * Moves into and selects an accordion by its `id`.
   */
  select: (id: string) => void;
};

export type AccordionInitialState = Pick<
  Partial<AccordionState>,
  "manual" | "allowToggle" | "selectedId"
> & {
  /**
   * The initial value to be used, in uncontrolled mode
   * @default null
   */
  defaultSelectedId?: StringOrNull | (() => StringOrNull);
  /**
   * The callback fired when the value changes
   */
  onSelectedIdChange?: (value: StringOrNull) => void;
  /**
   * The function that determines if the state should be updated
   */
  shouldUpdate?: (prev: StringOrNull, next: StringOrNull) => boolean;
} & AccordionBaseInitialState;

export type AccordionStateReturn = AccordionState & AccordionActions;
