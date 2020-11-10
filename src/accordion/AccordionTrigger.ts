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
import { createHook, createComponent } from "reakit-system";

import { ariaAttr } from "../utils";
import { ACCORDION_TRIGGER_KEYS } from "./__keys";
import { AccordionStateReturn, SelectedIdPair } from "./types";

export type AccordionTriggerOptions = ButtonOptions &
  CompositeItemOptions &
  Pick<Partial<AccordionStateReturn>, "manual"> &
  Pick<
    AccordionStateReturn,
    "panels" | "select" | "unSelect" | "allowMultiple" | "allowToggle"
  > &
  SelectedIdPair;

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
    {
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      ...htmlProps
    },
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
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        const first = options.first && (() => setTimeout(options.first));
        const last = options.last && (() => setTimeout(options.last));
        const keyMap = { Home: first, End: last };
        const action = keyMap[event.key as keyof typeof keyMap];
        if (action) {
          event.preventDefault();
          event.stopPropagation();
          action();
          return;
        }

        onKeyDownRef.current?.(event);
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [options.first, options.last],
    );

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleSelection],
    );

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;

        if (manual) return;
        handleSelection();
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [manual, handleSelection],
    );

    return {
      "aria-expanded": selected,
      "aria-controls": accordionPanelId,
      "aria-disabled": ariaAttr(!allowToggle && selected),
      onClick,
      onFocus,
      onKeyDown,
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
  if (!id) return;

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
