// Core Logic for transition is based on https://github.com/roginfarrer/react-collapsed
import * as React from "react";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef } from "reakit-utils";

import { PresenceHTMLProps, PresenceOptions, usePresence } from "../presence";
import { createComposableHook } from "../system";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";
import { getState } from "./helpers";

export type DisclosureContentOptions = BoxOptions &
  PresenceOptions &
  Pick<DisclosureStateReturn, "baseId" | "expanded"> & {};

export type DisclosureContentHTMLProps = BoxHTMLProps & PresenceHTMLProps;

export type DisclosureContentProps = DisclosureContentOptions &
  DisclosureContentHTMLProps;

export const disclosureComposableContent = createComposableHook<
  DisclosureContentOptions,
  DisclosureContentHTMLProps
>({
  name: "DisclosureContent",
  compose: [useBox, usePresence],
  keys: DISCLOSURE_CONTENT_KEYS,

  useProps(options, htmlProps) {
    const { expanded, baseId, present } = options;
    const {
      ref: htmlRef,
      style: htmlStyle,
      children: htmlChildren,
      ...restHtmlProps
    } = htmlProps;
    const ref = React.useRef<HTMLElement>(null);
    const [isPresent, setIsPresent] = React.useState(present);
    const heightRef = React.useRef<number | undefined>(0);
    const height = heightRef.current;
    const widthRef = React.useRef<number | undefined>(0);
    const width = widthRef.current;
    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isExpanded = expanded || isPresent;

    React.useLayoutEffect(() => {
      const node = ref.current;

      if (node) {
        const originalTransition = node.style.transition;
        const originalAnimation = node.style.animation;
        // block any animations/transitions so the element renders at its full dimensions
        node.style.transition = "none";
        node.style.animation = "none";

        // get width and height from full dimensions
        const rect = node.getBoundingClientRect();
        heightRef.current = rect.height;
        widthRef.current = rect.width;

        // kick off any animations/transitions that were originally set up
        node.style.transition = originalTransition;
        node.style.animation = originalAnimation;
        setIsPresent(present);
      }
      /**
       * depends on `context.open` because it will change to `false`
       * when a close is triggered but `present` will be `false` on
       * animation end (so when close finishes). This allows us to
       * retrieve the dimensions *before* closing.
       */
    }, [expanded, present]);

    const style = {
      "--content-height": height ? `${height}px` : undefined,
      "--content-width": width ? `${width}px` : undefined,
      ...htmlStyle,
    };

    return {
      ref: useForkRef(ref, htmlRef),
      "data-state": getState(expanded),
      id: baseId,
      hidden: !isExpanded,
      style,
      children: isExpanded ? htmlChildren : null,
      ...restHtmlProps,
    };
  },
});

export const useDisclosureContent = disclosureComposableContent();

export const DisclosureContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDisclosureContent,
});
