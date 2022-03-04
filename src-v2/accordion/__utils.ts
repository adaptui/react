import { createStoreContext } from "ariakit-utils/store";

import { AccordionState } from "./accordion-state";

export const AccordionContext = createStoreContext<AccordionState>();

export const getSelectedId = (state?: AccordionState, id?: string) => {
  if (!id) return;

  if (state?.allowMultiple) {
    return state?.selectedId?.includes(id);
  }

  return state?.selectedId === id;
};
