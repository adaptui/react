import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import {
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
} from "reakit";

import { ACCORDION_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export type AccordionItemOptions = unstable_IdOptions & AccordionStateReturn;

export type AccordionItemHTMLProps = unstable_IdHTMLProps;

export const useAccordionItem = createHook<
  AccordionItemOptions,
  AccordionItemHTMLProps
>({
  name: "AccordionItem",
  compose: unstable_useId,
  keys: ACCORDION_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const { id, registerItem } = options;

    const ref = React.useRef<HTMLElement>(null);

    React.useLayoutEffect(() => {
      if (!id) return undefined;

      registerItem?.({ id, ref });
    }, [id, registerItem]);

    return { ref: useForkRef(ref, htmlRef), ...htmlProps };
  },

  useComposeProps(_, htmlProps) {
    return { ...htmlProps };
  },
});

export const AccordionItem = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordionItem,
});
