import {
  useCompositeState,
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "reakit";
import * as React from "react";
import { useControllableState } from "@chakra-ui/hooks";

export type AccordionState = CompositeState & {
  /**
   * The current selected(controlled) accordion's `id`.
   */
  selectedId: string | null;
  /**
   * The current selected(controlled) accordion's `id`.
   */
  selectedIds: (string | null)[];
  /**
   * Whether the accodion selection should be manual.
   *
   * @default true
   */
  manual: boolean;
  /**
   * Allow to open multiple accordion items
   *
   * @default false
   */
  allowMultiple: boolean;
  /**
   * Allow to toggle accordion items
   *
   * @default false
   */
  allowToggle: boolean;
  /**
   * Lists all the panels.
   */
  panels: AccordionState["items"];
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
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  /**
   * Sets `selectedIds`.
   */
  setSelectedIds: React.Dispatch<React.SetStateAction<(string | null)[]>>;
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
  Pick<
    Partial<AccordionState>,
    "selectedId" | "selectedIds" | "manual" | "allowMultiple" | "allowToggle"
  > & {
    /**
     * Set default selected id(uncontrolled)
     *
     * @default null
     */
    defaultSelectedId?: string | null;
    /**
     * Handler that is called when the selectedId changes.
     */
    onSelectedIdChange?: (value: string | null) => void;
    /**
     * Set default selected ids(uncontrolled)
     *
     * @default []
     */
    defaultSelectedIds?: (string | null)[];
    /**
     * Handler that is called when the selectedIds changes.
     */
    onSelectedIdsChange?: (value: (string | null)[]) => void;
  };

export type AccordionStateReturn = AccordionState & AccordionActions;

export function useAccordionState(
  initialState: AccordionInitialState = {},
): AccordionStateReturn {
  const {
    selectedId: selectedIdProp,
    defaultSelectedId = null,
    onSelectedIdChange,
    selectedIds: selectedIdsProp,
    defaultSelectedIds = [],
    onSelectedIdsChange,
    allowMultiple = false,
    allowToggle: allowToggleProp = false,
    manual = true,
    ...rest
  } = initialState;
  const allowToggle = allowMultiple ? allowMultiple : allowToggleProp;

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
    registerPanel: panels.registerItem,
    unregisterPanel: panels.unregisterItem,
    ...composite,
  };
}
