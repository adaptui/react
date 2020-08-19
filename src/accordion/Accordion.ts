import { createComponent, createHook } from "reakit-system";
import { ACCORDION_KEYS } from "./__keys";

export const useAccordion = createHook<{}, {}>({
  name: "AccordionPanel",
  keys: ACCORDION_KEYS,
});

export const Accordion = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordion,
});
