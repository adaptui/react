import { FocusEvent, MouseEvent, useCallback } from "react";
import {
  CompositeItemOptions,
  useCompositeItem,
} from "ariakit/composite/composite-item";
import { useEventCallback, useId } from "ariakit-utils/hooks";
import { createMemoComponent, useStore } from "ariakit-utils/store";
import { createElement, createHook } from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

import { AccordionContext } from "./__utils";
import { AccordionState } from "./accordion-state";

function getPanelId(panels?: AccordionState["panels"], id?: string) {
  if (!id) return;
  return panels?.items.find(panel => panel.accordionId === id)?.id;
}

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a accordion element. The underlying element must be
 * wrapped in a `Accordion` component or a component that implements the
 * `useAccordion` props.
 * @see https://ariakit.org/components/accordion
 * @example
 * ```jsx
 * const state = useAccordionState();
 * const props = useAccordionDisclosure({ state });
 * <Accordion state={state}>
 *   <Role {...props}>Accordion 1</Role>
 *   <AccordionPanel state={state}>Panel 1</AccordionPanel>
 * </Accordion>
 * ```
 */
export const useAccordionDisclosure = createHook<AccordionDisclosureOptions>(
  ({
    state,
    accessibleWhenDisabled = true,
    getItem: getItemProp,
    ...props
  }) => {
    const id = useId(props.id);

    state = useStore(state || AccordionContext, [
      useCallback((s: AccordionState) => id && s.selectedId === id, [id]),
      "panels",
      "toggle",
      "selectOnMove",
    ]);

    const dimmed = props.disabled;

    const getItem = useCallback(
      item => {
        const nextItem = { ...item, dimmed };
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [dimmed, getItemProp],
    );

    const onClickProp = useEventCallback(props.onClick);

    const onClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClickProp(event);
        if (event.defaultPrevented) return;

        state?.toggle(id);
      },
      [onClickProp, state?.toggle, id],
    );

    const onFocusProp = useEventCallback(props.onFocus);

    const onFocus = useCallback(
      (event: FocusEvent<HTMLButtonElement>) => {
        onFocusProp(event);
        if (event.defaultPrevented) return;
        if (!state?.selectOnMove) return;

        state?.toggle(id);
      },
      [onFocusProp, state?.toggle, id, state?.selectOnMove],
    );

    const panelId = getPanelId(state?.panels, id);

    props = {
      id,
      "aria-expanded": state?.selectedId === id,
      "aria-controls": panelId || undefined,
      ...props,
      onClick,
      onFocus,
    };

    props = useCompositeItem({
      state,
      ...props,
      accessibleWhenDisabled,
      getItem,
    });

    return { ...props, tabIndex: 0, children: id };
  },
);

/**
 * A component that renders a accordion element. The underlying element must be
 * wrapped in a `Accordion` component.
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
export const AccordionDisclosure =
  createMemoComponent<AccordionDisclosureOptions>(props => {
    const htmlProps = useAccordionDisclosure(props);
    return createElement("button", htmlProps);
  });

export type AccordionDisclosureOptions<T extends As = "button"> = Omit<
  CompositeItemOptions<T>,
  "state"
> & {
  /**
   * Object returned by the `useAccordionState` hook. If not provided, the parent
   * `Accordion` component's context will be used.
   */
  state?: AccordionState;
};

export type AccordionDisclosureProps<T extends As = "button"> = Props<
  AccordionDisclosureOptions<T>
>;
