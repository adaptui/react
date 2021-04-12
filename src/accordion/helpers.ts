import * as React from "react";

import { AccordionPanelOptions } from "./AccordionPanel";
import { AccordionTriggerOptions } from "./AccordionTrigger";

export type StringOrNull = string | null;

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
export function getAccordionId(options: AccordionPanelOptions) {
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

export function isPanelVisible(options: AccordionPanelOptions) {
  const { allowMultiple, selectedId, selectedIds } = options;
  const accordionId = getAccordionId(options);

  if (allowMultiple)
    return accordionId ? selectedIds?.includes(accordionId) : false;

  return accordionId ? selectedId === accordionId : false;
}

export function isAccordionSelected(options: AccordionTriggerOptions) {
  const { id, allowMultiple, selectedId, selectedIds } = options;

  if (!id) return;

  if (allowMultiple) return selectedIds?.includes(id);

  return selectedId === id;
}

export function useAccordionPanelId(options: AccordionTriggerOptions) {
  const { panels, id } = options;

  return React.useMemo(
    () => panels?.find(panel => panel.groupId === id)?.id || undefined,
    [panels, id],
  );
}
