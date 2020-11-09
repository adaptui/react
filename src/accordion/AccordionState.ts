import { useControllableState } from "@chakra-ui/hooks";
import * as React from "react";
import { useCompositeState } from "reakit";
import {
  AccordionStateReturn,
  AccordionInitialState,
  MultiOverloadSignature,
  SingleOverloadSignature,
  AccordionInitialStateMulti,
  AccordionInitialStateSingle,
} from "./types";

export function useAccordionState(
  initialState: Partial<AccordionInitialStateSingle>,
): SingleOverloadSignature;
export function useAccordionState(
  initialState: Partial<AccordionInitialStateMulti>,
): MultiOverloadSignature;

export function useAccordionState(
  props: Partial<AccordionInitialState> = {},
): AccordionStateReturn {
  const {
    allowToggle: allowToggleProp = false,
    manual = true,
    ...rest
  } = props;
  const allowToggle = props.allowMultiple
    ? props.allowMultiple
    : allowToggleProp;

  const selectedIdProp =
    props.allowMultiple === false ? props.selectedId : null;
  const defaultSelectedId =
    props.allowMultiple === false ? props.defaultSelectedId : null;
  const onSelectedIdChange =
    props.allowMultiple === false ? props.onSelectedIdChange : undefined;

  const selectedIdsProp = props.allowMultiple === true ? props.selectedIds : [];
  const defaultSelectedIds =
    props.allowMultiple === true ? props.defaultSelectedIds : [];
  const onSelectedIdsChange =
    props.allowMultiple === true ? props.onSelectedIdsChange : undefined;

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
        allowMultiple: false,
        selectedId,
        setSelectedId,
        ...common,
      }
    : {
        allowMultiple: true,
        selectedIds,
        setSelectedIds,
        ...common,
      };
}
