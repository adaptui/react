// Inspired from Radix UI https://github.com/radix-ui/primitives/tree/main/packages/react/collapsible
import * as React from "react";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef } from "reakit-utils";

import { usePresenceState } from "../presence";
import { createComposableHook } from "../system";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";

export type DisclosureContentOptions = BoxOptions &
  Pick<DisclosureStateReturn, "baseId" | "visible"> & {
    present: boolean;
    presenceRef: ((value: any) => void) | null;
  };

export type DisclosureContentHTMLProps = BoxHTMLProps;

export type DisclosureContentProps = DisclosureContentOptions &
  DisclosureContentHTMLProps;

export const disclosureComposableContent = createComposableHook<
  DisclosureContentOptions,
  DisclosureContentHTMLProps
>({
  name: "DisclosureContent",
  compose: useBox,
  keys: DISCLOSURE_CONTENT_KEYS,

  useOptions(options, htmlProps) {
    const { visible } = options;
    const { ref } = htmlProps;
    const { isPresent: present, ref: presenceRef } = usePresenceState({
      present: visible,
    });

    return { ...options, present, presenceRef: useForkRef(ref, presenceRef) };
  },

  useProps(options, htmlProps) {
    const { visible, baseId, presenceRef, present } = options;
    const { ref: htmlRef, style: htmlStyle, ...restHtmlProps } = htmlProps;
    const ref = React.useRef<HTMLElement>(null);
    const [isPresent, setIsPresent] = React.useState(present);
    const heightRef = React.useRef<number | undefined>(0);
    const height = heightRef.current;
    const widthRef = React.useRef<number | undefined>(0);
    const width = widthRef.current;
    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isVisible = visible || isPresent;

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
    }, [visible, present]);

    const style = {
      "--content-height": height ? `${height}px` : undefined,
      "--content-width": width ? `${width}px` : undefined,
      display: isVisible ? undefined : "none",
      ...htmlStyle,
    };

    return {
      ref: useForkRef(presenceRef, useForkRef(ref, htmlRef)),
      "data-enter": visible ? "" : undefined,
      "data-leave": !visible ? "" : undefined,
      id: baseId,
      hidden: !isVisible,
      style,
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
