import {
  useButton,
  ButtonOptions,
  ButtonHTMLProps,
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
} from "reakit";
import * as React from "react";
import { useLiveRef } from "reakit-utils";
import { createHook, createComponent } from "reakit-system";

import { ariaAttr } from "../utils";
import { ACCORDION_TRIGGER_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";
import { AccordionMultiStateReturn } from "./AccordionMultiState";
import { isAccordionSelected, useAccordionPanelId } from "./helpers";

export const useAccordionTrigger = createHook<
  AccordionTriggerOptions,
  AccordionTriggerHTMLProps
>({
  name: "Accordion",
  compose: [useButton, useCompositeItem],
  keys: ACCORDION_TRIGGER_KEYS,

  useProps(
    options,
    {
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      ...htmlProps
    },
  ) {
    const { manual, id, allowToggle, disabled, select, first, last } = options;
    const selected = isAccordionSelected(options);
    const accordionPanelId = useAccordionPanelId(options);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;

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
      [first, last, onKeyDownRef],
    );

    const handleSelection = React.useCallback(() => {
      if (!id) return;
      if (disabled) return;

      select?.(id);
    }, [id, disabled, select]);

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
    | "allowMultiple"
    | "allowToggle"
    | "selectedId"
    | "manual"
  > &
  Pick<AccordionMultiStateReturn, "selectedIds">;

export type AccordionTriggerHTMLProps = ButtonHTMLProps &
  CompositeItemHTMLProps;

export type AccordionTriggerProps = AccordionTriggerOptions &
  AccordionTriggerHTMLProps;
