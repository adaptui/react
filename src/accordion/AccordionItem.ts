import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import {
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
} from "reakit";
import { useForkRef } from "reakit-utils";

import { AccordionStateReturn } from "./AccordionState";
import { ACCORDION_KEYS } from "./__keys";

export type AccordionItemOptions = unstable_IdOptions & AccordionStateReturn;

export type AccordionItemHTMLProps = unstable_IdHTMLProps;

export const useAccordionItem = createHook<
  AccordionItemOptions,
  AccordionItemHTMLProps
>({
  name: "AccordionItem",
  compose: [unstable_useId],
  keys: ACCORDION_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const { id } = options;

    React.useLayoutEffect(() => {
      if (!id) return undefined;

      options.registerItem?.({ id, ref });

      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [id]);

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
