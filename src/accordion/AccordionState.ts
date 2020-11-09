import * as React from "react";
import { useCompositeState } from "reakit";
import {
  useSealedState,
  SealedInitialState,
} from "reakit-utils/useSealedState";
import {
  AccordionStateReturn,
  AccordionInitialState,
  MultiOverloadSignature,
  SingleOverloadSignature,
  AccordionInitialStateMulti,
  AccordionInitialStateSingle,
} from "./types";

export function useAccordionState(
  initialState: SealedInitialState<Partial<AccordionInitialStateSingle>>,
): SingleOverloadSignature;
export function useAccordionState(
  initialState: SealedInitialState<Partial<AccordionInitialStateMulti>>,
): MultiOverloadSignature;

export function useAccordionState(
  initialState: SealedInitialState<Partial<AccordionInitialState>> = {},
): AccordionStateReturn {
  const {
    manual = true,
    allowToggle: allowToggleProp = false,
    ...sealed
  } = useSealedState(initialState);

  const allowMultiple = sealed.allowMultiple ? sealed.allowMultiple : false;
  const initialSelectedId =
    sealed.allowMultiple === false ? sealed.selectedId : null;
  const initialSelectedIds =
    sealed.allowMultiple === true ? sealed.selectedIds : [];

  const allowToggle = useSealedState(
    allowMultiple ? allowMultiple : allowToggleProp,
  );

  const composite = useCompositeState({
    currentId: initialSelectedId,
    orientation: "vertical",
    ...sealed,
  });

  // Single toggle accordion State
  const [selectedId, setSelectedId] = React.useState(initialSelectedId);
  // Multiple toggle accordion State
  const [selectedIds, setSelectedIds] = React.useState(initialSelectedIds);

  const select = React.useCallback(
    (id: string | null) => {
      composite.move(id);

      if (!allowMultiple) {
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
    [allowMultiple, allowToggle, composite.move, selectedId],
  );

  const unSelect = React.useCallback(
    (id: string | null) => {
      if (!allowMultiple && id === null) return;

      composite.move(id);
      setSelectedIds(prevIds => prevIds?.filter(pId => pId !== id));
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [composite.move],
  );

  const panels = useCompositeState();

  const common = {
    manual,
    select,
    unSelect,
    allowToggle,
    panels: panels.items,
    registerPanel: panels.registerItem,
    unregisterPanel: panels.unregisterItem,
    ...composite,
  };

  return allowMultiple === true
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
