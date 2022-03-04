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
  selectOnMove = false,
  shouldSelectFirstId = false,
  allowMultiple = false,
  allowToggle = false,
  ...props
}: AccordionStateProps = {}): AccordionState {
  const [selectedId, setSelectedId] = useControlledState(
    props.defaultSelectedId,
    props.selectedId,
    props.setSelectedId,
  );
  allowToggle = allowMultiple || allowToggle;
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

    if (allowMultiple) {
      if (accordion.id == null) {
        setSelectedId(accordion.id);
        return;
      }

      setSelectedId([accordion.id]);
      return;
    }

    setSelectedId(accordion.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composite.moves, selectOnMove, setSelectedId, allowMultiple]);

  // Automatically set selectedId if it's undefined.
  useEffect(() => {
    if (!shouldSelectFirstId) return;
    if (allowToggle) return;
    if (selectedId !== undefined) return;

    // First, we try to set selectedId based on the current active accordion.
    const activeId = compositeRef.current.activeId;

    const accordion = findEnabledAccordionById(composite.items, activeId);
    if (accordion) {
      if (allowMultiple) {
        if (activeId == null) {
          setSelectedId(activeId);
          return;
        }

        setSelectedId([activeId]);
        return;
      } else {
        setSelectedId(activeId);
      }
    }
    // If there's no active accordion or the active accordion is dimmed, we get the first
    // enabled accordion instead.
    else {
      const firstEnabledAccordion = findFirstEnabledAccordion(composite.items);
      if (allowMultiple) {
        if (firstEnabledAccordion?.id == null) {
          setSelectedId(firstEnabledAccordion?.id);
          return;
        }

        setSelectedId([firstEnabledAccordion?.id]);
        return;
      } else {
        setSelectedId(firstEnabledAccordion?.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allowToggle,
    shouldSelectFirstId,
    selectedId,
    composite.items,
    allowMultiple,
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
      if (allowMultiple) {
        if (activeId == null) {
          setSelectedId(activeId);
          return;
        }

        setSelectedId([activeId]);
        return;
      } else {
        setSelectedId(activeId);
      }
    }
    // If there's no active accordion or the active accordion is dimmed, we get the first
    // enabled accordion instead.
    else {
      const firstEnabledAccordion = findFirstEnabledAccordion(composite.items);
      if (allowMultiple) {
        if (firstEnabledAccordion?.id == null) {
          setSelectedId(firstEnabledAccordion?.id);
          return;
        }

        setSelectedId([firstEnabledAccordion?.id]);
        return;
      } else {
        setSelectedId(firstEnabledAccordion?.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allowToggle,
    shouldSelectFirstId,
    selectedId,
    composite.items,
    setSelectedId,
    allowMultiple,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composite.items, panels.setItems]);

  const select: AccordionState["select"] = useCallback(
    id => {
      composite.move(id);
      if (allowMultiple) {
        if (id == null) {
          setSelectedId(id);
          return;
        }

        if (selectedId?.includes(id)) {
          setSelectedId(prevId =>
            (prevId as string[])?.filter(pId => pId !== id),
          );

          return;
        }

        setSelectedId((prevId: string[]) => {
          if (prevId == null) {
            return [id];
          }

          return [...prevId, id];
        });

        return;
      } else {
        setSelectedId(id);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [composite.move, setSelectedId, selectedId, allowMultiple],
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
      allowMultiple,
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
      allowMultiple,
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
  allowMultiple: boolean;
  /**
   * The id of the accordion whose panel is currently visible.
   */
  selectedId: AccordionState["activeId"] | string[];
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
      | "selectedId"
      | "selectOnMove"
      | "shouldSelectFirstId"
      | "allowToggle"
      | "allowMultiple"
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
