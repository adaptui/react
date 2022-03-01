import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  CollectionState,
  useCollectionState,
} from "ariakit/collection/collection-state";
import {
  CompositeState,
  CompositeStateProps,
  useCompositeState,
} from "ariakit/composite/composite-state";
import { useControlledState, useLiveRef } from "ariakit-utils/hooks";
import { useStorePublisher } from "ariakit-utils/store";
import { SetState } from "ariakit-utils/types";

import { usePrevious } from "../utils";

type Item = CompositeState["items"][number] & {
  dimmed?: boolean;
};

type Panel = CollectionState["items"][number] & {
  id: string;
  accordionId?: string | null;
};

function findEnabledAccordionById(items: Item[], id?: string | null) {
  return items.find(item => item.id === id && !item.disabled && !item.dimmed);
}

function findFirstEnabledAccordion(items: Item[]) {
  return items.find(item => !item.disabled && !item.dimmed);
}

/**
 * Provides state for the `Accordion` components.
 * @example
 * ```jsx
 * const accordion = useAccordionState();
 * <Accordion state={accordion}>
 *   <Accordion>Accordion 1</Accordion>
 *   <AccordionPanel state={accordion}>Panel 1</AccordionPanel>
 *   <AccordionPanel state={accordion}>Panel 2</AccordionPanel>
 *   <Accordion>Accordion 2</Accordion>
 * </Accordion>
 * ```
 */
export function useAccordionState({
  orientation = "vertical",
  focusLoop = true,
  allowToggle = false,
  selectOnMove = false,
  shouldSelectFirstId = false,
  ...props
}: AccordionStateProps = {}): AccordionState {
  const [selectedId, setSelectedId] = useControlledState(
    props.defaultSelectedId,
    props.selectedId,
    props.setSelectedId,
  );
  const composite = useCompositeState({ orientation, focusLoop, ...props });
  const panels = useCollectionState<Panel>();
  const compositeRef = useLiveRef(composite);
  const firstEnabledAccordionSelected = useRef(false);

  // Selects the active accordion when selectOnMove is true. Since we're listening to
  // the moves state, but not the activeId state, this effect will run only when
  // there's a move, which is usually triggered by moving through the accordions using
  // the keyboard.
  useEffect(() => {
    if (!selectOnMove) return;
    const { activeId, items } = compositeRef.current;
    if (!activeId) return;
    const accordion = findEnabledAccordionById(items, activeId);
    if (!accordion) return;
    setSelectedId(accordion.id);
  }, [composite.moves, selectOnMove, setSelectedId]);

  // Keep activeId in sync with selectedId.
  useEffect(() => {
    if (selectedId === compositeRef.current.activeId) return;
    composite.setActiveId(selectedId);
  }, [selectedId, composite.setActiveId]);

  // Automatically set selectedId if it's undefined.
  useEffect(() => {
    if (!shouldSelectFirstId) return;
    if (allowToggle) return;
    if (selectedId !== undefined) return;

    // First, we try to set selectedId based on the current active accordion.
    const activeId = compositeRef.current.activeId;

    const accordion = findEnabledAccordionById(composite.items, activeId);
    if (accordion) {
      setSelectedId(activeId);
    }
    // If there's no active accordion or the active accordion is dimmed, we get the first
    // enabled accordion instead.
    else {
      const firstEnabledAccordion = findFirstEnabledAccordion(composite.items);
      setSelectedId(firstEnabledAccordion?.id);
    }
  }, [
    allowToggle,
    shouldSelectFirstId,
    selectedId,
    composite.items,
    setSelectedId,
  ]);

  // Automatically set selectedId if it's undefined.
  useEffect(() => {
    if (!shouldSelectFirstId || !allowToggle) return;
    if (firstEnabledAccordionSelected.current === true) return;

    // First, we try to set selectedId based on the current active accordion.
    const activeId = compositeRef.current.activeId;
    const accordion = findEnabledAccordionById(composite.items, activeId);
    if (accordion) {
      firstEnabledAccordionSelected.current = true;
      setSelectedId(activeId);
    }
    // If there's no active accordion or the active accordion is dimmed, we get the first
    // enabled accordion instead.
    else {
      const firstEnabledAccordion = findFirstEnabledAccordion(composite.items);
      setSelectedId(firstEnabledAccordion?.id);
    }
  }, [
    allowToggle,
    shouldSelectFirstId,
    selectedId,
    composite.items,
    setSelectedId,
  ]);

  // Keep panels accordionIds in sync with the current accordions.
  useEffect(() => {
    if (!composite.items.length) return;
    panels.setItems(prevPanels => {
      const hasOrphanPanels = prevPanels.some(panel => !panel.accordionId);
      if (!hasOrphanPanels) return prevPanels;
      return prevPanels.map((panel, i) => {
        if (panel.accordionId) return panel;
        const accordion = composite.items[i];
        return { ...panel, accordionId: accordion?.id };
      });
    });
  }, [composite.items, panels.setItems]);

  const select: AccordionState["select"] = useCallback(
    id => {
      composite.move(id);
      setSelectedId(id);
    },
    [composite.move, setSelectedId],
  );

  const toggle: AccordionState["toggle"] = useCallback(
    id => {
      if (!allowToggle) {
        select(id);

        return;
      }

      if (id === selectedId) {
        setSelectedId(undefined);
      } else {
        select(id);
      }
    },
    [selectedId, setSelectedId, select, allowToggle],
  );

  const state = useMemo(
    () => ({
      ...composite,
      allowToggle,
      selectedId,
      setSelectedId,
      select,
      toggle,
      panels,
      selectOnMove,
    }),
    [
      composite,
      allowToggle,
      selectedId,
      setSelectedId,
      select,
      toggle,
      panels,
      selectOnMove,
    ],
  );

  return useStorePublisher(state);
}

export type AccordionState = CompositeState<Item> & {
  allowToggle: boolean;
  /**
   * The id of the accordion whose panel is currently visible.
   */
  selectedId: AccordionState["activeId"];
  /**
   * Sets the `selectedId` state.
   */
  setSelectedId: SetState<AccordionState["selectedId"]>;
  /**
   * Selects the accordion panel for the accordion with the given id.
   */
  select: AccordionState["move"];
  /**
   * Selects the accordion panel for the accordion with the given id.
   */
  toggle: AccordionState["move"];
  /**
   * A collection state containing the accordion panels.
   */
  panels: CollectionState<Panel>;
  /**
   * Whether the accordion should be selected when it receives focus. If it's set to
   * `false`, the accordion will be selected only when it's clicked.
   * @default false
   */
  selectOnMove?: boolean;
  /**
   * Whether the first accordion should be selected by default. If it's set to `false`,
   * the accordion will be selected only when it's clicked.
   * @default false
   */
  shouldSelectFirstId?: boolean;
};

export type AccordionStateProps = CompositeStateProps<Item> &
  Partial<
    Pick<
      AccordionState,
      "selectedId" | "selectOnMove" | "shouldSelectFirstId" | "allowToggle"
    >
  > & {
    /**
     * The id of the accordion whose panel should be initially visible.
     * @example
     * ```jsx
     * const accordion = useAccordionState({ defaultSelectedId: "accordion-1" });
     * <Accordion state={accordion}>
     *   <Accordion id="accordion-1">Accordion 1</Accordion>
     *   <AccordionPanel state={accordion}>Panel 1</AccordionPanel>
     * </Accordion>
     * ```
     */
    defaultSelectedId?: AccordionState["selectedId"];
    /**
     * Function that will be called when setting the accordion `selectedId` state.
     * @example
     * function Accordions({ visibleAccordion, onAccordionChange }) {
     *   const accordion = useAccordionState({
     *     selectedId: visibleAccordion,
     *     setSelectedId: onAccordionChange,
     *   });
     * }
     */
    setSelectedId?: (selectedId: AccordionState["selectedId"]) => void;
  };

export function isNull(value: any): value is null {
  return value === null;
}
