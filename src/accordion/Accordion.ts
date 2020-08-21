import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, useBox } from "reakit";

import { AccordionStateReturn } from "./AccordionState";
import { ACCORDION_KEYS } from "./__keys";

export const useAccordion = createHook<AccordionStateReturn, BoxHTMLProps>({
  name: "AccordionPanel",
  keys: ACCORDION_KEYS,
  compose: [useBox],
});

export const Accordion = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordion,
});
