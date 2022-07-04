import { createStoreContext } from "ariakit-utils/store";

import { AccordionState, Item } from "./accordion-state";

export const AccordionContext = createStoreContext<AccordionState>();

export const getSelectedId = (state?: AccordionState, id?: string) => {
  if (!id) return;

  if (state?.allowMultiple) return state?.selectedId?.includes(id);

  return state?.selectedId === id;
};

export const findEnabledAccordionById = (items: Item[], id?: string | null) => {
  return items.find(item => item.id === id && !item.disabled && !item.dimmed);
};

export const findFirstEnabledAccordion = (items: Item[]) => {
  return items.find(item => !item.disabled && !item.dimmed);
};

export const getAccordionId = (
  panels?: AccordionState["panels"],
  id?: string,
) => {
  if (!id) return;

  return panels?.items.find(panel => panel.id === id)?.accordionId;
};

export const getPanelId = (panels?: AccordionState["panels"], id?: string) => {
  if (!id) return;
  return panels?.items.find(panel => panel.accordionId === id)?.id;
};
