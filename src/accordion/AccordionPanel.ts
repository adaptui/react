import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import {
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
} from "reakit";

import { ACCORDION_PANEL_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";
import { useAccordionItemContext } from "./AccordionItem";

export type AccordionPanelOptions = unstable_IdOptions &
  Pick<AccordionStateReturn, "registerPanel" | "items" | "activeItems">;

export type AccordionPanelHTMLProps = unstable_IdHTMLProps;

export type AccordionPanelProps = AccordionPanelOptions &
  AccordionPanelHTMLProps;

export const useAccordionPanel = createHook<
  AccordionPanelOptions,
  AccordionPanelHTMLProps
>({
  name: "AccordionPanel",
  compose: unstable_useId,
  keys: ACCORDION_PANEL_KEYS,

  useProps({ id, registerPanel }, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      if (!id) return undefined;

      registerPanel?.({ id, ref });
    }, [id, registerPanel]);

    const { item, isOpen } = useAccordionItemContext();
    const buttonId = item?.button?.id;

    return {
      role: "region",
      "aria-labelledby": `${buttonId ? buttonId : undefined}`,
      ref: useForkRef(ref, htmlRef),
      hidden: !isOpen,
      ...htmlProps,
    };
  },
});

export const AccordionPanel = createComponent({
  as: "div",
  useHook: useAccordionPanel,
});
