import {
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useButton,
  ButtonOptions,
  ButtonHTMLProps,
} from "reakit";
import * as React from "react";
import { useLiveRef } from "reakit-utils";
import { ariaAttr } from "@chakra-ui/utils";
import { createHook, createComponent } from "reakit-system";

import { ACCORDION_TRIGGER_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export type AccordionTriggerOptions = ButtonOptions &
  CompositeItemOptions &
  Pick<Partial<AccordionStateReturn>, "manual"> &
  Pick<
    AccordionStateReturn,
    | "panels"
    | "selectedId"
    | "selectedIds"
    | "select"
    | "unSelect"
    | "allowMultiple"
    | "allowToggle"
  >;

export type AccordionTriggerHTMLProps = ButtonHTMLProps &
  CompositeItemHTMLProps;

export type AccordionTriggerProps = AccordionTriggerOptions &
  AccordionTriggerHTMLProps;

export const useAccordionTrigger = createHook<
  AccordionTriggerOptions,
  AccordionTriggerHTMLProps
>({
  name: "Accordion",
  compose: [useButton, useCompositeItem],
  keys: ACCORDION_TRIGGER_KEYS,

  useOptions({ focusable = true, ...options }) {
    return { focusable, ...options };
  },

  useProps(
    options,
    { onClick: htmlOnClick, onFocus: htmlOnFocus, ...htmlProps },
  ) {
    const {
      manual,
      id,
      allowToggle,
      allowMultiple,
      disabled,
      select,
      unSelect,
    } = options;
    const selected = isAccordionSelected(options);
    const accordionPanelId = useAccordionPanelId(options);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);

    const handleSelection = React.useCallback(() => {
      if (disabled) return;
      if (!id) return;

      if (selected) {
        if (allowToggle && !allowMultiple) {
          // Do not send null to make the toggle because that will also reset
          //  the current Id in composite hence thats handled directly in state
          select(id);
          return;
        }

        unSelect(id);
        return;
      }

      select?.(id);
    }, [selected, id, allowMultiple, allowToggle, disabled, select, unSelect]);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;

        handleSelection();
      },

      [handleSelection, onClickRef],
    );

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;

        if (manual) return;
        handleSelection();
      },

      [onFocusRef, manual, handleSelection],
    );

    return {
      "aria-expanded": selected,
      "aria-controls": accordionPanelId,
      "aria-disabled": ariaAttr(!allowToggle && selected),
      onClick,
      onFocus,
      ...htmlProps,
    };
  },

  useComposeProps(options, htmlProps) {
    const buttonHtmlProps = useButton(options, htmlProps);
    const compositeHtmlProps = useCompositeItem(options, buttonHtmlProps);

    return {
      ...compositeHtmlProps,
      tabIndex: 0,
    };
  },
});

export const AccordionTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: useAccordionTrigger,
});

function isAccordionSelected(options: AccordionTriggerOptions) {
  const { id, allowMultiple, selectedId, selectedIds } = options;

  if (!allowMultiple) return selectedId === id;
  return selectedIds?.includes(id);
}

function useAccordionPanelId(options: AccordionTriggerOptions) {
  const { panels, id } = options;

  return React.useMemo(
    () => panels?.find(panel => panel.groupId === id)?.id || undefined,
    [panels, id],
  );
}
