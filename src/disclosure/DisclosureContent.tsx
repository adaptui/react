// Inspired from Radix UI https://github.com/radix-ui/primitives/tree/main/packages/react/collapsible
import * as React from "react";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { isSelfTarget, useForkRef, useLiveRef } from "reakit-utils";
import { useSafeLayoutEffect } from "@chakra-ui/hooks";

import { usePresenceState } from "../presence";
import { createComposableHook } from "../system";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";

export type DisclosureContentOptions = BoxOptions &
  Pick<DisclosureStateReturn, "baseId" | "visible"> & {
    present: boolean;
    presenceRef: ((value: any) => void) | null;

    /**
     * Whether it uses animation or not.
     */
    animation: boolean;

    /**
     * Whether it uses animation or not.
     */
    transition: boolean;
  };

export type DisclosureContentHTMLProps = BoxHTMLProps;

export type DisclosureContentProps = DisclosureContentOptions &
  DisclosureContentHTMLProps;

type TransitionState = "enter" | "leave" | null;

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
    const { visible, baseId, presenceRef, present, transition, animation } =
      options;
    const {
      ref: htmlRef,
      style: htmlStyle,
      onTransitionEnd: htmlOnTransitionEnd,
      ...restHtmlProps
    } = htmlProps;
    const ref = React.useRef<HTMLElement>(null);
    const [isPresent, setIsPresent] = React.useState(present);
    const heightRef = React.useRef<number | undefined>(0);
    const height = heightRef.current;
    const widthRef = React.useRef<number | undefined>(0);
    const width = widthRef.current;

    const [transitionState, setTransitionState] =
      React.useState<TransitionState>(null);
    const [transitioning, setTransitioning] = React.useState(false);
    const lastVisible = useLastValue(visible);
    const onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);

    const visibleHasChanged =
      lastVisible.current != null && lastVisible.current !== visible;

    if (transition && !transitioning && visibleHasChanged) {
      // Sets transitioning to true when when visible is updated
      setTransitioning(true);
    }

    const raf = React.useRef(0);

    React.useEffect(() => {
      if (!transition) return;

      // Double RAF is needed so the browser has enough time to paint the
      // default styles before processing the `data-enter` attribute. Otherwise
      // it wouldn't be considered a transition.
      // See https://github.com/reakit/reakit/issues/643
      raf.current = window.requestAnimationFrame(() => {
        raf.current = window.requestAnimationFrame(() => {
          if (visible) {
            if (!transitioning) return;

            setTransitionState("enter");
          } else if (transitioning) {
            setTransitionState("leave");
          } else {
            setTransitionState(null);
          }
        });
      });

      return () => window.cancelAnimationFrame(raf.current);
    }, [visible, transitioning, transition]);

    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isVisible = visible || isPresent;
    const isHidden =
      (animation && !isVisible) ||
      (transition && !visible && !transitioning) ||
      (!animation && !transition && !isVisible);

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
      display: isHidden ? "none" : undefined,
      ...htmlStyle,
    };

    const onTransitionEnd = React.useCallback(
      (event: React.TransitionEvent) => {
        onTransitionEndRef.current?.(event);
        if (!isSelfTarget(event)) return;
        if (!transition) return;
        if (!transitioning) return;

        // Ignores number animated
        setTransitioning(false);
      },
      [onTransitionEndRef, transition, transitioning],
    );

    return {
      ref: useForkRef(presenceRef, useForkRef(ref, htmlRef)),
      id: baseId,
      hidden: isHidden,
      // "data-enter": visible ? "" : undefined,
      // "data-leave": !visible ? "" : undefined,
      "data-enter":
        (transition && transitionState === "enter") || (animation && visible)
          ? ""
          : undefined,
      "data-leave":
        (transition && transitionState === "leave") || (animation && !visible)
          ? ""
          : undefined,
      onTransitionEnd,
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

function useLastValue<T>(value: T) {
  const lastValue = React.useRef<T | null>(null);

  useSafeLayoutEffect(() => {
    lastValue.current = value;
  }, [value]);

  return lastValue;
}
