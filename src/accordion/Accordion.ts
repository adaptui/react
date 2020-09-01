import { BoxHTMLProps, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { ACCORDION_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export const useAccordion = createHook<AccordionStateReturn, BoxHTMLProps>({
  name: "AccordionPanel",
  compose: useBox,
  keys: ACCORDION_KEYS,
});

export const Accordion = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordion,
});
