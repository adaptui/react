import { CompositeItemOptions, useButton, useCompositeItem } from "ariakit";
import { useId, useStore } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

import { AccordionContext } from "./__utils";
import { AccordionState } from "./accordion-state";

export const useAccordionDisclosure = createHook<AccordionDisclosureOptions>(
  ({ state, ...props }) => {
    const id = useId(props.id);
    state = useStore(state || AccordionContext, []);

    props = useCompositeItem(state, ...props);

    return props;
  },
);

export const AccordionDisclosure = createComponent<AccordionDisclosureOptions>(
  props => {
    return createElement("button", props);
  },
);

export type AccordionDisclosureOptions<T extends As = "button"> = Omit<
  CompositeItemOptions<T>,
  "state"
> & {
  /**
   * Object returned by the `useAccordionDisclosureState` hook. If not provided, the parent
   * `AccordionDisclosureList` component's context will be used.
   */
  state?: AccordionState;
};

export type AccordionDisclosureProps<T extends As = "button"> = Props<
  AccordionDisclosureOptions<T>
>;
