import {
  CompositeState,
  CompositeActions,
  useCompositeState,
  CompositeInitialState,
} from "reakit";

export function useAccordionBaseState(
  props: AccordionBaseInitialState = {},
): AccordionBaseStateReturn {
  const composite = useCompositeState({
    orientation: "vertical",
    ...props,
  });

  const panels = useCompositeState();

  return {
    panels: panels.items,
    registerPanel: panels.registerItem,
    unregisterPanel: panels.unregisterItem,
    ...composite,
  };
}

export type AccordionBaseState = CompositeState & {
  /**
   * Lists all the panels.
   */
  panels: CompositeState["items"];
};

export type AccordionBaseActions = CompositeActions & {
  /**
   * Registers a accordion panel.
   */
  registerPanel: CompositeActions["registerItem"];

  /**
   * Unregisters a accordion panel.
   */
  unregisterPanel: CompositeActions["unregisterItem"];
};

export type AccordionBaseInitialState = CompositeInitialState;

export type AccordionBaseStateReturn = AccordionBaseState &
  AccordionBaseActions;
