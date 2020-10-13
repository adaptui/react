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

import { ACCORDION_ITEM_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export type AccordionItemOptions = ButtonOptions &
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

export type AccordionItemHTMLProps = ButtonHTMLProps & CompositeItemHTMLProps;

export type AccordionItemProps = AccordionItemOptions & AccordionItemHTMLProps;

function useAccordionPanelId(options: AccordionItemOptions) {
  return React.useMemo(
    () =>
      options.panels?.find(panel => panel.groupId === options.id)?.id ||
      undefined,
    [options.panels, options.id],
  );
}

export const useAccordionItem = createHook<
  AccordionItemOptions,
  AccordionItemHTMLProps
>({
  name: "Accordion",
  compose: [useButton, useCompositeItem],
  keys: ACCORDION_ITEM_KEYS,

  useOptions({ focusable = true, ...options }) {
    return { focusable, ...options };
  },

  useProps(
    options,
    { onClick: htmlOnClick, onFocus: htmlOnFocus, ...htmlProps },
  ) {
    const selected = isAccordionSelected(options);
    const accordionPanelId = useAccordionPanelId(options);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (!options.id) return;

        if (selected) {
          if (options.allowToggle && !options.allowMultiple) {
            // Do not send null to make the toggle because that will also reset
            //  the current Id in composite hence thats handled directly in state
            options.select(options.id);
            return;
          }

          options.unSelect(options.id);
          return;
        }

        options.select?.(options.id);
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.disabled, selected, options.select, options.id],
    );

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (options.manual) return;
        if (!options.id) return;

        if (selected) {
          if (options.allowToggle && !options.allowMultiple) {
            // Do not send null to make the toggle because that will also reset
            //  the current Id in composite hence thats handled directly in state
            options.select(options.id);
            return;
          }

          options.unSelect(options.id);
          return;
        }

        options.select?.(options.id);
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.id, options.disabled, options.manual, selected, options.select],
    );

    return {
      "aria-expanded": selected,
      "aria-controls": accordionPanelId,
      "aria-disabled": ariaAttr(!options.allowToggle && selected),
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

export const AccordionItem = createComponent({
  as: "button",
  memo: true,
  useHook: useAccordionItem,
});

function isAccordionSelected(options: AccordionItemOptions) {
  const { id, allowMultiple, selectedId, selectedIds } = options;

  if (!allowMultiple) return selectedId === id;
  return selectedIds?.includes(id);
}
