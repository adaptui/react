import * as React from "react";
import { useCompositeState } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";
import {
  AccordionState,
  AccordionActions,
  AccordionReturns,
  MultiOverloadReturn,
  SingleOverloadReturn,
  AccordionInitialState,
  AccordionInitialStateMulti,
  AccordionInitialStateSingle,
  SelectedIdPair,
} from "./types";

export type AccordionStateReturn = AccordionActions &
  AccordionState &
  AccordionReturns &
  SelectedIdPair;

export function useAccordionState(
  props: Partial<AccordionInitialStateSingle>,
): SingleOverloadReturn;

export function useAccordionState(
  props: Partial<AccordionInitialStateMulti>,
): MultiOverloadReturn;

export function useAccordionState(
  props: Partial<AccordionInitialState>,
): SingleOverloadReturn;

export function useAccordionState(
  props: Partial<AccordionInitialState>,
): MultiOverloadReturn;

export function useAccordionState(
  props: Partial<AccordionInitialState> = {},
): AccordionStateReturn {
  const { manual = true, allowMultiple, ...rest } = props;

  const allowToggle = props.allowMultiple
    ? props.allowMultiple
    : props.allowToggle || false;

  let selectedIdProp;
  let defaultSelectedId;
  let onSelectedIdChange;
  if (props.allowMultiple === false || !props.allowMultiple) {
    // @ts-ignore
    selectedIdProp = props.selectedId;
    // @ts-ignore
    defaultSelectedId = props.defaultSelectedId || null;
    // @ts-ignore
    onSelectedIdChange = props.onSelectedIdChange;
  }

  let selectedIdsProp;
  let defaultSelectedIds;
  let onSelectedIdsChange;
  if (props.allowMultiple === true) {
    selectedIdsProp = props.selectedIds;
    defaultSelectedIds = props.defaultSelectedIds || [];
    onSelectedIdsChange = props.onSelectedIdsChange;
  }

  // Single toggle accordion State
  const [selectedId, setSelectedId] = useControllableState({
    defaultValue: defaultSelectedId,
    value: selectedIdProp,
    onChange: onSelectedIdChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  // Multiple toggle accordion State
  const [selectedIds, setSelectedIds] = useControllableState({
    defaultValue: defaultSelectedIds,
    value: selectedIdsProp,
    onChange: onSelectedIdsChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const composite = useCompositeState({
    orientation: "vertical",
    ...rest,
  });

  const select = React.useCallback(
    (id: string | null) => {
      composite.move(id);

      if (!props.allowMultiple) {
        if (allowToggle && id === selectedId) {
          setSelectedId(null);
          return;
        }

        setSelectedId(id);
        return;
      }

      if (id === null) return;
      setSelectedIds(prevIds => [...prevIds, id]);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allowMultiple, allowToggle, composite.move, selectedId],
  );

  const unSelect = React.useCallback(
    (id: string | null) => {
      if (!props.allowMultiple && id === null) return;

      composite.move(id);
      setSelectedIds(prevIds => prevIds?.filter(pId => pId !== id));
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [composite.move],
  );

  const panels = useCompositeState();

  const common = {
    manual,
    allowToggle,
    select,
    unSelect,
    panels: panels.items,
    registerPanel: panels.registerItem,
    unregisterPanel: panels.unregisterItem,
    ...composite,
  };

  return props.allowMultiple === true
    ? {
        allowMultiple: true,
        selectedIds,
        setSelectedIds,
        ...common,
      }
    : {
        allowMultiple: false,
        selectedId,
        setSelectedId,
        ...common,
      };
}
