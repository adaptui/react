import {
  DisclosureContentOptions,
  DisclosureContentHTMLProps,
  useDisclosureContent,
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
} from "reakit";
import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";

import { ACCORDION_PANEL_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export type AccordionPanelOptions = DisclosureContentOptions &
  unstable_IdOptions &
  Pick<
    AccordionStateReturn,
    | "selectedId"
    | "selectedIds"
    | "registerPanel"
    | "unregisterPanel"
    | "panels"
    | "items"
    | "allowMultiple"
  > & {
    /**
     * Accordion's id
     */
    accordionId?: string;
  };

export type AccordionPanelHTMLProps = DisclosureContentHTMLProps &
  unstable_IdHTMLProps;

export type AccordionPanelProps = AccordionPanelOptions &
  AccordionPanelHTMLProps;

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
  useHook: useAccordionPanel,
});

/**
 * When <AccordionPanel> is used without accordionId:
 *
 *  - First render: getAccordionId will return undefined because options.panels
 * doesn't contain the current panel yet (registerPanel wasn't called yet).
 * Thus registerPanel will be called without groupId (accordionId).
 *
 *  - Second render: options.panels already contains the current panel (because
 * registerPanel was called in the previous render). This means that we'll be
 * able to get the related accordionId with the accordion panel index. Basically,
 * we filter out all the accordions and panels that have already matched. In this
 * phase, registerPanel will be called again with the proper groupId (accordionId).
 *
 *  - In the third render, panel.groupId will be already defined, so we just
 * return it. registerPanel is not called.
 */
function getAccordionId(options: AccordionPanelOptions) {
  const { panels, id, items } = options;
  const panel = panels?.find(p => p.id === id);
  const accordionId = options.accordionId || panel?.groupId;
  if (accordionId || !panel || !panels || !items) {
    return accordionId;
  }

  const panelIndex = getPanelIndex(panels, panel);
  const accordionsWithoutPanel = getAccordionsWithoutPanel(items, panels);
  return accordionsWithoutPanel[panelIndex]?.id || undefined;
}

function getPanelIndex(
  panels: AccordionPanelOptions["panels"],
  panel: typeof panels[number],
) {
  const panelsWithoutAccordionId = panels.filter(p => !p.groupId);
  return panelsWithoutAccordionId.indexOf(panel);
}

function getAccordionsWithoutPanel(
  accordions: AccordionPanelOptions["items"],
  panels: AccordionPanelOptions["panels"],
) {
  const panelsAccordionIds = panels.map(panel => panel.groupId).filter(Boolean);

  return accordions.filter(
    item => panelsAccordionIds.indexOf(item.id || undefined) === -1,
  );
}

function isPanelVisible(options: AccordionPanelOptions) {
  const { allowMultiple, selectedId, selectedIds } = options;
  const accordionId = getAccordionId(options);

  if (!allowMultiple) return accordionId ? selectedId === accordionId : false;
  return accordionId ? selectedIds?.includes(accordionId) : false;
}
