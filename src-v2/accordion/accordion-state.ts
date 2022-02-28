import { useMemo } from "react";
import {
  CollectionState,
  useCollectionState,
} from "ariakit/collection/collection-state";
import {
  CompositeState,
  CompositeStateProps,
  useCompositeState,
} from "ariakit/composite/composite-state";
import { useStorePublisher } from "ariakit-utils/store";

type Item = CompositeState["items"][number] & {
  dimmed?: boolean;
};

type Panel = CollectionState["items"][number] & {
  id: string;
  accordionId?: string | null;
};

/**
 * Provides state for the `Accordion` components.
 * @example
 * ```jsx
 * const accordion = useAccordionState();
 * <AccordionList state={accordion}>
 *   <Accordion>Accordion 1</Accordion>
 *   <Accordion>Accordion 2</Accordion>
 * </AccordionList>
 * <AccordionPanel state={accordion}>Panel 1</AccordionPanel>
 * <AccordionPanel state={accordion}>Panel 2</AccordionPanel>
 * ```
 */
export function useAccordionState({
  orientation = "vertical",
  focusLoop = true,
  ...props
}: AccordionStateProps = {}): AccordionState {
  const composite = useCompositeState({ orientation, focusLoop, ...props });
  const panels = useCollectionState<Panel>();

  const state = useMemo(() => ({ ...composite, panels }), [composite, panels]);

  return useStorePublisher(state);
}

export type AccordionState = CompositeState<Item> & {
  /**
   * A collection state containing the tab panels.
   */
  panels: CollectionState<Panel>;
};

export type AccordionStateProps = CompositeStateProps<Item> & {};
