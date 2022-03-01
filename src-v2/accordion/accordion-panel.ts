import { useCallback, useEffect, useRef, useState } from "react";
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
import { getAllTabbableIn } from "ariakit-utils/focus";
import { useForkRef, useId } from "ariakit-utils/hooks";
import { useStore } from "ariakit-utils/store";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";
import { id } from "date-fns/locale";

import { AccordionContext } from "./__utils";
import { AccordionState } from "./accordion-state";

function getAccordionId(panels?: AccordionState["panels"], id?: string) {
  if (!id) return;
  return panels?.items.find(panel => panel.id === id)?.accordionId;
}

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
 * </Accordion>
 * <Role {...props}>Panel 1</Role>
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

    const [hasTabbableChildren, setHasTabbableChildren] = useState(false);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;
      const tabbable = getAllTabbableIn(element);
      setHasTabbableChildren(!!tabbable.length);
    }, []);

    const getItem = useCallback(
      item => {
        const nextItem = { ...item, id, accordionId: accordionIdProp };
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [id, accordionIdProp, getItemProp],
    );

    const accordionId = accordionIdProp || getAccordionId(state?.panels, id);
    const visible = !!accordionId && state?.selectedId === accordionId;

    props = {
      id,
      role: "region",
      "aria-labelledby": accordionId || undefined,
      ...props,
      ref: useForkRef(ref, props.ref),
    };

    const disclosure = useDisclosureState({ visible });

    props = useFocusable({ focusable: hasTabbableChildren, ...props });
    props = useDisclosureContent({ state: disclosure, ...props });
    props = useCollectionItem({
      state: state?.panels,
      ...props,
      getItem,
      shouldRegisterItem: !!id ? props.shouldRegisterItem : false,
    });

    return { ...props, children: id };
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
 *   <AccordionPanel state={accordion}>Panel 1</AccordionPanel>
 *   <AccordionDisclosure>Accordion 2</AccordionDisclosure>
 *   <AccordionPanel state={accordion}>Panel 2</AccordionPanel>
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
