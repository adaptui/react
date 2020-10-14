import {
  useCompositeState,
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "reakit";
import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

export type AccordionState = CompositeState & {
  /**
   * The current selected accordion's `id`.
   */
  selectedId?: AccordionState["currentId"];
  /**
   * Initial selected accordion's `id`.
   * @default []
   */
  selectedIds?: AccordionState["currentId"][];
  /**
   * Lists all the panels.
   */
  panels: AccordionState["items"];
  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual: boolean;
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle?: boolean;
};

export type AccordionActions = CompositeActions & {
  /**
   * Moves into and selects an accordion by its `id`.
   */
  select: AccordionActions["move"];
  /**
   * Moves into and unSelects an accordion by its `id` if it's already selected.
   */
  unSelect: AccordionActions["move"];
  /**
   * Sets `selectedId`.
   */
  setSelectedId: AccordionActions["setCurrentId"];
  /**
   * Sets `selectedIds`.
   */
  setSelectedIds: React.Dispatch<
    React.SetStateAction<CompositeState["currentId"][]>
  >;
  /**
   * Registers a accordion panel.
   */
  registerPanel: AccordionActions["registerItem"];
  /**
   * Unregisters a accordion panel.
   */
  unregisterPanel: AccordionActions["unregisterItem"];
};

export type AccordionInitialState = CompositeInitialState &
  Partial<
    Pick<
      AccordionState,
      "selectedId" | "selectedIds" | "manual" | "allowMultiple" | "allowToggle"
    >
  >;

export type AccordionStateReturn = AccordionState & AccordionActions;

export function useAccordionState(
  initialState: SealedInitialState<AccordionInitialState> = {},
): AccordionStateReturn {
  const {
    selectedId: initialSelectedId,
    selectedIds: initialSelectedIds = [],
    allowMultiple = false,
    allowToggle: allowToggleProp = false,
    manual = true,
    ...sealed
  } = useSealedState(initialState);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registerPanel = React.useCallback(panel => panels.registerItem(panel), [
    panels.registerItem,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unregisterPanel = React.useCallback(id => panels.unregisterItem(id), [
    panels.unregisterItem,
  ]);

  return {
    manual,
    allowMultiple,
    allowToggle,
    selectedId,
    setSelectedId,
    selectedIds,
    setSelectedIds,
    select,
    unSelect,
    panels: panels.items,
    registerPanel,
    unregisterPanel,
    ...composite,
  };
}
