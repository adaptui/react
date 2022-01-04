import * as React from "react";
import { createHook } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  CompositeItemHTMLProps,
  CompositeItemOptions,
  useButton,
  useCompositeItem,
} from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";

import { createComponent } from "../system";
import { ariaAttr } from "../utils";

import { ACCORDION_TRIGGER_KEYS } from "./__keys";
import { AccordionMultiStateReturn } from "./AccordionMultiState";
import { AccordionStateReturn } from "./AccordionState";
import { isAccordionSelected, useAccordionPanelId } from "./helpers";

export const useAccordionTrigger = createHook<
  AccordionTriggerOptions,
  AccordionTriggerHTMLProps
>({
  name: "Accordion",
  compose: [useButton, useCompositeItem],
  keys: ACCORDION_TRIGGER_KEYS,

  // * Do not add `focusable: true` in useOptions or else the disabled button
  // * will receive the focus & considered as an element in composite navigation

  useProps(
    options,
    {
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      ...htmlProps
    },
  ) {
    const { manual, id, allowToggle, select, first, last } = options;
    const selected = isAccordionSelected(options);
    const accordionPanelId = useAccordionPanelId(options);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        const _first = first && (() => setTimeout(first));
        const _last = last && (() => setTimeout(last));
        const keyMap = { Home: _first, End: _last };
        const action = keyMap[event.key as keyof typeof keyMap];

        if (action) {
          event.preventDefault();
          event.stopPropagation();
          action();
        }
      },
      [first, last],
    );

    const handleSelection = React.useCallback(() => {
      if (!id) return;

      select?.(id);
    }, [id, select]);

    const onClick = React.useCallback(
      () => handleSelection(),
      [handleSelection],
    );

    const onFocus = React.useCallback(() => {
      if (manual) return;

      handleSelection();
    }, [manual, handleSelection]);

    return {
      "aria-expanded": selected,
      "aria-controls": accordionPanelId,
      "aria-disabled": ariaAttr(!allowToggle && selected),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onClick: callAllHandlers(htmlOnClick, onClick),
      onFocus: callAllHandlers(htmlOnFocus, onFocus),
      ...htmlProps,
    };
  },

  useComposeProps(options, htmlProps) {
    const buttonHtmlProps = useButton(options, htmlProps);
    const compositeHtmlProps = useCompositeItem(options, buttonHtmlProps);

    return {
      ...compositeHtmlProps,

      // *Add the tabIndex = 0 to button to make it tabbable in composite
      tabIndex: 0,
    };
  },
});

export const AccordionTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: useAccordionTrigger,
});

export type AccordionTriggerOptions = ButtonOptions &
  CompositeItemOptions &
  Pick<
    AccordionStateReturn,
    | "panels"
    | "select"
    | "manual"
    | "selectedId"
    | "allowToggle"
    | "allowMultiple"
  > &
  Pick<AccordionMultiStateReturn, "selectedIds">;

export type AccordionTriggerHTMLProps = ButtonHTMLProps &
  CompositeItemHTMLProps;

export type AccordionTriggerProps = AccordionTriggerOptions &
  AccordionTriggerHTMLProps;
