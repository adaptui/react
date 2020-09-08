import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { useForkRef, useLiveRef, createOnKeyDown } from "reakit-utils";
import {
  ButtonHTMLProps,
  ButtonOptions,
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
  useButton,
} from "reakit";

import { ACCORDION_TRIGGER_KEYS } from "./__keys";
import { AccordionStateReturn } from "./AccordionState";

export type AccordionTriggerOptions = unstable_IdOptions &
  ButtonOptions &
  Pick<
    AccordionStateReturn,
    | "removeActiveItem"
    | "addActiveItem"
    | "registerButton"
    | "items"
    | "activeItems"
    | "next"
    | "prev"
    | "first"
    | "last"
    | "allowToggle"
    | "manual"
  >;

export type AccordionTriggerHTMLProps = ButtonHTMLProps & unstable_IdHTMLProps;

export type AccordionTriggerProps = AccordionTriggerOptions &
  AccordionTriggerHTMLProps;

export const useAccordionTrigger = createHook<
  AccordionTriggerOptions,
  AccordionTriggerHTMLProps
>({
  name: "AccordionTrigger",
  compose: [useButton, unstable_useId],
  keys: ACCORDION_TRIGGER_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      onFocus: htmlOnFocus,
      ...htmlProps
    },
  ) {
    const {
      id,
      removeActiveItem,
      addActiveItem,
      registerButton,
      items,
      activeItems,
      next,
      prev,
      first,
      last,
      allowToggle,
      manual,
    } = options;

    const item = items.find(({ button }) => button?.id === id);
    const panelId = item?.panel?.id;
    const isOpen = item ? activeItems.includes(item.id) : false;

    const ref = React.useRef<HTMLElement>(null);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    React.useEffect(() => {
      if (!id) return undefined;

      registerButton?.({ id, ref });
    }, [id, registerButton]);

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (!item) return;

        if (activeItems.includes(item.id) && allowToggle) {
          removeActiveItem?.(item.id);
        } else {
          addActiveItem?.(item.id);
        }
      },
      [
        activeItems,
        addActiveItem,
        allowToggle,
        item,
        onClickRef,
        removeActiveItem,
      ],
    );

    const onFocus = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        if (!item) return;
        if (manual) return;

        if (!activeItems.includes(item.id)) {
          addActiveItem?.(item.id);
        }
      },
      [activeItems, addActiveItem, item, manual, onFocusRef],
    );

    const onCharacterKeyDown = React.useCallback(
      event => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;
      },
      [onKeyDownRef],
    );

    const onKeyDown = React.useMemo(() => {
      return createOnKeyDown({
        onKeyDown: onCharacterKeyDown,
        stopPropagation: true,
        keyMap: () => {
          if (!id) return {};

          return {
            ArrowDown: () => {
              next(id);
            },
            ArrowUp: () => {
              prev(id);
            },
            Home: first,
            End: last,
          };
        },
      });
    }, [onCharacterKeyDown, id, next, prev, first, last]);

    return {
      "aria-controls": `${panelId ? panelId : undefined}`,
      "aria-expanded": isOpen,
      onClick,
      onKeyDown,
      onFocus,
      ref: useForkRef(ref, htmlRef),
      ...htmlProps,
    };
  },
});

export const AccordionTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: useAccordionTrigger,
});
