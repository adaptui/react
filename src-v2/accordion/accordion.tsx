import { CompositeOptions, useComposite } from "ariakit";
import { useStoreProvider } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

import { AccordionContext } from "./__utils";
import { AccordionState } from "./accordion-state";

export const useAccordion = createHook<AccordionOptions>(
  ({ state, ...props }) => {
    props = useStoreProvider({ state, ...props }, AccordionContext);
    props = useComposite({ state, ...props });

    return props;
  },
);

export const Accordion = createComponent<AccordionOptions>(props => {
  return createElement("div", props);
});

export type AccordionOptions<T extends As = "div"> = Omit<
  CompositeOptions<T>,
  "state"
> & {
  /**
   * Object returned by the `useAccordionState` hook.
   */
  state: AccordionState;
};

export type AccordionProps<T extends As = "div"> = Props<AccordionOptions<T>>;
