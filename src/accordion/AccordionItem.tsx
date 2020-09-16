import * as React from "react";
import { useForkRef } from "reakit-utils";
import { createContext } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";
import {
  unstable_IdHTMLProps,
  unstable_IdOptions,
  unstable_useId,
} from "reakit";

import { ACCORDION_ITEM_KEYS } from "./__keys";
import { AccordionStateReturn, Item } from "./AccordionState";

export type AccordionItemOptions = unstable_IdOptions &
  Pick<AccordionStateReturn, "registerItem" | "activeItems" | "items"> & {
    isOpen?: boolean;
  };

export type AccordionItemHTMLProps = unstable_IdHTMLProps;

export type AccordionItemProps = AccordionItemOptions & AccordionItemHTMLProps;

type TAccordionItemContext = {
  isOpen: boolean;
  item: Item | undefined;
};

export const [AccordionItemProvider, useAccordionItemContext] = createContext<
  TAccordionItemContext
>({
  name: "useAccordionItemContext",
  errorMessage:
    "The `useAccordionItem` hook must be called from a descendent of the `AccordionItemProvider`.",
  strict: true,
});

export const useAccordionItem = createHook<
  AccordionItemOptions,
  AccordionItemHTMLProps
>({
  name: "AccordionItem",
  compose: unstable_useId,
  keys: ACCORDION_ITEM_KEYS,

  useProps(
    { id, registerItem, activeItems, items, isOpen: isOpenOption },
    { ref: htmlRef, children: htmlChildren, ...htmlProps },
  ) {
    const ref = React.useRef<HTMLElement>(null);

    React.useLayoutEffect(() => {
      if (!id) return undefined;

      registerItem?.({ id, ref });
    }, [id, registerItem]);

    const isOpenLocal = id ? activeItems.includes(id) : false;
    const isOpen = isOpenOption ?? isOpenLocal;
    const item = items.find(({ id: itemId }) => itemId === id);
    const children = (
      <AccordionItemProvider value={{ item, isOpen }}>
        {htmlChildren}
      </AccordionItemProvider>
    );

    return {
      ref: useForkRef(ref, htmlRef),
      children,
      ...htmlProps,
    };
  },

  useComposeProps(_, htmlProps) {
    // We don't want to run `unstable_useId` hook in compose.
    // So that we only use it for useOptions & use the id to register the item.
    return htmlProps;
  },
});

export const AccordionItem = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordionItem,
});
