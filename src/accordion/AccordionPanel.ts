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
  keys: ACCORDION_KEYS,
  compose: [unstable_useId],

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    const { id } = options;
    const item = options.items.find(({ panel }) => panel?.id === id);
    const buttonId = item?.button?.id;
    const isOpen = item ? options.activeItems.includes(item.id) : false;

    React.useEffect(() => {
      if (!id) return undefined;

      options.registerPanel?.({ id, ref });
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [id]);

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
