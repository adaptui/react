import { useCallback, useEffect, useRef, useState } from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import {
  CollectionItemOptions,
  useCollectionItem,
} from "ariakit/collection/collection-item";
import {
  DisclosureContentOptions,
  useDisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";
import { FocusableOptions, useFocusable } from "ariakit/focusable";
import { Item } from "ariakit/ts/collection/__utils";
import { getAllTabbableIn } from "ariakit-utils/focus";
import { useForkRef, useId } from "ariakit-utils/hooks";
import { useStore } from "ariakit-utils/store";
import { As, Props } from "ariakit-utils/types";

import { AccordionContext, getAccordionId, getSelectedId } from "./__utils";
import { AccordionState } from "./accordion-state";

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a accordion panel element.
 * @see https://ariakit.org/components/accordion
 * @example
 * ```jsx
 * const state = useAccordionState();
 * const props = useAccordionPanel({ state });
 * <Accordion state={state}>
 *   <AccordionDisclosure>Accordion 1</AccordionDisclosure>
 *   <Role {...props}>Panel 1</Role>
 * </Accordion>
 * ```
 */
export const useAccordionPanel = createHook<AccordionPanelOptions>(
  ({ state, accordionId: accordionIdProp, getItem: getItemProp, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const id = useId(props.id);

    state = useStore(state || AccordionContext, [
      "selectedId",
      "panels",
      "setSelectedId",
    ]);

    const accordionId = accordionIdProp || getAccordionId(state?.panels, id);

    props = {
      id,
      role: "region",
      "aria-labelledby": accordionId || undefined,
      ...props,
      ref: useForkRef(ref, props.ref),
    };

    const [hasTabbableChildren, setHasTabbableChildren] = useState(false);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const tabbable = getAllTabbableIn(element);
      setHasTabbableChildren(!!tabbable.length);
    }, []);

    props = useFocusable({ focusable: hasTabbableChildren, ...props });

    const open = !!accordionId && getSelectedId(state, accordionId);
    const disclosure = useDisclosureState({ open });
    props = useDisclosureContent({ state: disclosure, ...props });

    const getItem = useCallback(
      (item: Item) => {
        const nextItem = { ...item, id, accordionId: accordionIdProp };
        if (getItemProp) return getItemProp(nextItem);

        return nextItem;
      },
      [id, accordionIdProp, getItemProp],
    );

    props = useCollectionItem({
      state: state?.panels,
      ...props,
      getItem,
      shouldRegisterItem: !!id ? props.shouldRegisterItem : false,
    });

    return props;
  },
);

/**
 * A component that renders a accordion panel element.
 * @see https://ariakit.org/components/accordion
 * @example
 * ```jsx
 * const accordion = useAccordionState();
 * <Accordion state={accordion}>
 *   <AccordionDisclosure>Accordion 1</AccordionDisclosure>
 *   <AccordionPanel>Panel 1</AccordionPanel>
 *   <AccordionDisclosure>Accordion 2</AccordionDisclosure>
 *   <AccordionPanel>Panel 2</AccordionPanel>
 * </Accordion>
 * ```
 */
export const AccordionPanel = createComponent<AccordionPanelOptions>(props => {
  const htmlProps = useAccordionPanel(props);

  return createElement("div", htmlProps);
});

export type AccordionPanelOptions<T extends As = "div"> = FocusableOptions<T> &
  Omit<CollectionItemOptions, "state"> &
  Omit<DisclosureContentOptions<T>, "state"> & {
    /**
     * Object returned by the `useAccordionState` hook.
     */
    state?: AccordionState;
    /**
     * The id of the accordion that controls this panel. By default, this value will
     * be inferred based on the order of the accordions and the panels.
     */
    accordionId?: string | null;
  };

export type AccordionPanelProps<T extends As = "div"> = Props<
  AccordionPanelOptions<T>
>;
