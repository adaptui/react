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

export type AccordionPanelOptions = unstable_IdOptions & AccordionStateReturn;

export type AccordionPanelHTMLProps = unstable_IdHTMLProps;

export const useAccordionPanel = createHook<
  AccordionPanelOptions,
  AccordionPanelHTMLProps
>({
  name: "AccordionPanel",
  compose: unstable_useId,
  keys: ACCORDION_KEYS,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const { id, registerPanel, items, activeItems } = options;

    const ref = React.useRef<HTMLElement>(null);
    const item = items.find(({ panel }) => panel?.id === id);
    const buttonId = item?.button?.id;
    const isOpen = item ? activeItems.includes(item.id) : false;

    React.useEffect(() => {
      if (!id) return undefined;

      registerPanel?.({ id, ref });
    }, [id, registerPanel]);

    const style = {
      display: `${isOpen ? "block" : "none"}`,
      ...htmlStyle,
    };

    return {
      role: "region",
      "aria-labelledby": `${buttonId ? buttonId : undefined}`,
      style,
      ref: useForkRef(ref, htmlRef),
      ...htmlProps,
    };
  },
});

export const AccordionPanel = createComponent({
  as: "div",
  useHook: useAccordionPanel,
});
