import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

export const useAccordionContent = createHook<AccordionContentOptions>(
  props => {
    return props;
  },
);

export const AccordionContent = createComponent<AccordionContentOptions>(
  props => {
    return createElement("div", props);
  },
);

export type AccordionContentOptions<T extends As = "div"> = Options<T>;

export type AccordionContentProps<T extends As = "div"> = Props<
  AccordionContentOptions<T>
>;
