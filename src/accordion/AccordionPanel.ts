import * as React from "react";
import { createHook } from "reakit-system";
import {
  DisclosureContentHTMLProps,
  DisclosureContentOptions,
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
  useDisclosureContent,
} from "reakit";
import { useForkRef } from "reakit-utils";

import { createComponent } from "../system";

import { ACCORDION_PANEL_KEYS } from "./__keys";
import { AccordionMultiStateReturn } from "./AccordionMultiState";
import { AccordionStateReturn } from "./AccordionState";
import { getAccordionId, isPanelVisible } from "./helpers";

export const useAccordionPanel = createHook<
  AccordionPanelOptions,
  AccordionPanelHTMLProps
>({
  name: "AccordionPanel",
  compose: [unstable_useId, useDisclosureContent],
  keys: ACCORDION_PANEL_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const { id, registerPanel, unregisterPanel } = options;
    const accordionId = getAccordionId(options);

    React.useLayoutEffect(() => {
      if (!id) return;

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
    | "items"
    | "panels"
    | "selectedId"
    | "allowMultiple"
    | "registerPanel"
    | "unregisterPanel"
  > &
  Pick<AccordionMultiStateReturn, "selectedIds">;

export type AccordionPanelHTMLProps = DisclosureContentHTMLProps &
  unstable_IdHTMLProps;

export type AccordionPanelProps = AccordionPanelOptions &
  AccordionPanelHTMLProps;
