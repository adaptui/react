/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react";

import { createComponent, createHook } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
  useButton,
} from "reakit";
import {
  useForkRef,
  useLiveRef,
  createOnKeyDown,
  isSelfTarget,
} from "reakit-utils";

import { AccordionStateReturn } from "./AccordionState";
import { ACCORDION_KEYS } from "./__keys";

export type AccordionTriggerOptions = unstable_IdOptions &
  ButtonOptions &
  AccordionStateReturn;

export type AccordionTriggerHTMLProps = ButtonHTMLProps & unstable_IdHTMLProps;

export const useAccordionTrigger = createHook<
  AccordionTriggerOptions,
  AccordionTriggerHTMLProps
>({
  name: "AccordionTrigger",
  keys: ACCORDION_KEYS,
  compose: [useButton, unstable_useId],

  useProps(
    options,
    {
      ref: htmlRef,
      onClick: htmlOnClick,
      onKeyDown: htmlOnKeyDown,
      ...htmlProps
    },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    const onClickRef = useLiveRef(htmlOnClick);
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);

    const { id } = options;
    const item = options.items.find(({ button }) => button?.id === id);
    const panelId = item?.panel?.id;
    const isOpen = item ? options.activeItems.includes(item.id) : false;

    React.useEffect(() => {
      if (!id) return undefined;

      options.registerButton?.({ id, ref });
    }, [id]);

    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClickRef.current?.(event);

      if (!item) return;

      if (options.activeItems.includes(item.id)) {
        options.removeActiveItem?.(item.id);
      } else {
        options.addActiveItem?.(item.id);
      }
    };

    const onCharacterKeyDown = React.useCallback(
      event => {
        onKeyDownRef.current?.(event);
      },
      [onKeyDownRef],
    );

    const onKeyDown = React.useMemo(() => {
      return createOnKeyDown({
        onKeyDown: onCharacterKeyDown,
        stopPropagation: true,
        // We don't want to listen to focusable elements inside the composite
        // item, such as a CompositeItemWidget.
        shouldKeyDown: isSelfTarget,
        keyMap: () => {
          if (!id) return {};

          const total = options.buttons.length;
          const buttonIds = options.buttons.map(({ id }) => id);
          const currentIndex = buttonIds.indexOf(id);
          return {
            ArrowDown: () => {
              const nextIndex = (currentIndex + 1) % total;
              const nextItem = options.buttons[nextIndex];
              nextItem.ref?.current?.focus();
            },
            ArrowUp: () => {
              const nextIndex = (currentIndex - 1 + total) % total;
              const nextItem = options.buttons[nextIndex];
              nextItem.ref?.current?.focus();
            },
            Home: () => {
              const nextItem = options.buttons[0];
              nextItem.ref?.current?.focus();
            },
            End: () => {
              const nextItem = options.buttons[0];
              nextItem.ref?.current?.focus();
            },
          };
        },
      });
    }, [id, onCharacterKeyDown, options.buttons]);

    return {
      "aria-controls": `${panelId ? panelId : undefined}`,
      "aria-expanded": isOpen,
      onClick,
      onKeyDown,
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
