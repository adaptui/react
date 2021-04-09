import {
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
  useDisclosureContent,
  DisclosureContentOptions,
  DisclosureContentHTMLProps,
} from "reakit";
import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";

import { ACCORDION_PANEL_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";
import { getAccordionId, isPanelVisible } from "./helpers";
import { AccordionMultiStateReturn } from "./AccordionMultiState";

export const useAccordionPanel = createHook<
  AccordionPanelOptions,
  AccordionPanelHTMLProps
>({
  name: "AccordionPanel",
  compose: [unstable_useId, useDisclosureContent],
  keys: ACCORDION_PANEL_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const accordionId = getAccordionId(options);
    const { id, registerPanel, unregisterPanel } = options;

    React.useLayoutEffect(() => {
      if (!id) return undefined;

      registerPanel?.({ id, ref, groupId: accordionId });

      return () => {
        unregisterPanel?.(id);
      };
    }, [accordionId, id, registerPanel, unregisterPanel]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "region",
      "aria-labelledby": accordionId,
      ...htmlProps,
    };
  },

  useComposeOptions(options) {
    return {
      visible: isPanelVisible(options),
      ...options,
    };
  },
});

export const AccordionPanel = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordionPanel,
});

export type AccordionPanelOptions = {
  /**
   * Accordion's id
   */
  accordionId?: string;
} & DisclosureContentOptions &
  unstable_IdOptions &
  Pick<
    AccordionStateReturn,
    | "registerPanel"
    | "unregisterPanel"
    | "panels"
    | "items"
    | "allowMultiple"
    | "selectedId"
  > &
  Pick<AccordionMultiStateReturn, "selectedIds">;

export type AccordionPanelHTMLProps = DisclosureContentHTMLProps &
  unstable_IdHTMLProps;

export type AccordionPanelProps = AccordionPanelOptions &
  AccordionPanelHTMLProps;
