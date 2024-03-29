import { FocusEvent, MouseEvent, useCallback } from "react";
import { createElement, createHook } from "ariakit-utils/system";
import {
  CompositeItemOptions,
  useCompositeItem,
} from "ariakit/composite/composite-item";
import { Item } from "ariakit/ts/collection/__utils";
import { useEvent, useId } from "ariakit-utils/hooks";
import { createMemoComponent, useStore } from "ariakit-utils/store";
import { As, Props } from "ariakit-utils/types";

import { AccordionContext, getPanelId, getSelectedId } from "./__utils";
import { AccordionState } from "./accordion-state";

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
 *   <AccordionPanel>Panel 1</AccordionPanel>
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
      useCallback(
        (s: AccordionState) => {
          if (!id) return;

          if (s.allowMultiple) {
            return s.selectedId?.includes(id);
          }

          return s.selectedId === id;
        },
        [id],
      ),
      "panels",
      "toggle",
      "selectOnMove",
    ]);

    const onClickProp = props.onClick;

    const onClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
      onClickProp?.(event);
      if (event.defaultPrevented) return;

      state?.toggle(id);
    });

    const onFocusProp = props.onFocus;

    const onFocus = useEvent((event: FocusEvent<HTMLButtonElement>) => {
      onFocusProp?.(event);
      if (event.defaultPrevented) return;
      if (!state?.selectOnMove) return;

      state?.toggle(id);
    });

    const panelId = getPanelId(state?.panels, id);

    props = {
      id,
      "aria-expanded": getSelectedId(state, id),
      "aria-controls": panelId || undefined,
      ...props,
      onClick,
      onFocus,
    };

    const dimmed = props.disabled;

    const getItem = useCallback(
      (item: Item) => {
        const nextItem = { ...item, dimmed };
        if (getItemProp) return getItemProp(nextItem);

        return nextItem;
      },
      [dimmed, getItemProp],
    );

    props = useCompositeItem({
      state,
      ...props,
      accessibleWhenDisabled,
      getItem,
    });

    return { ...props, tabIndex: 0 };
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
 *   <AccordionPanel>Panel 1</AccordionPanel>
 *   <AccordionDisclosure>Accordion 2</AccordionDisclosure>
 *   <AccordionPanel>Panel 2</AccordionPanel>
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
