// Inspired from Radix UI https://github.com/radix-ui/primitives/tree/main/packages/react/collapsible
import * as React from "react";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef, useLiveRef } from "reakit-utils";

import { createComposableHook } from "../system";
import { useAnimationPresence } from "../utils";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";
import {
  TransitionState,
  useAnimationPresenceSize,
  UseAnimationPresenceSizeReturnType,
  useTransitionPresence,
  UseTransitionPresenceReturnType,
} from "./helpers";

export type DisclosureContentOptions = BoxOptions &
  Pick<DisclosureStateReturn, "baseId" | "visible"> & {
    /**
     * Whether it uses animation or not.
     */
    animation?: boolean;

    /**
     * Whether it uses animation or not.
     */
    transition?: boolean;

    /**
     * Whether the content is hidden or not.
     */
    isHidden?: boolean;

    /**
     * Ref for the animation/transition.
     */
    presenceRef?: ((value: any) => void) | null;
    present?: UseAnimationPresenceSizeReturnType["isPresent"];
    transitionState?: TransitionState;
    onEnd?: UseTransitionPresenceReturnType["onEnd"];
    contentWidth?: UseAnimationPresenceSizeReturnType["width"];
    contentHeight?: UseAnimationPresenceSizeReturnType["height"];
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
    const { visible, animation = false, transition = false } = options;
    const { isPresent: present, ref: animationRef } = useAnimationPresence({
      present: visible,
    });
    const {
      isPresent,
      width: contentWidth,
      height: contentHeight,
      ref: transitionRef,
    } = useAnimationPresenceSize({
      present,
      visible,
    });
    const { transitionState, transitioning, onEnd } = useTransitionPresence({
      transition,
      visible,
    });

    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isVisible = visible || isPresent;
    const isHidden =
      (animation && !isVisible) ||
      (transition && !visible && !transitioning) ||
      (!animation && !transition && !isVisible);

    return {
      ...options,
      isHidden,
      presenceRef: useForkRef(animationRef, transitionRef),
      transitionState,
      onEnd,
      contentWidth,
      contentHeight,
      present,
    };
  },

  useProps(options, htmlProps) {
    const {
      visible,
      baseId,
      presenceRef,
      transition,
      animation,
      onEnd,
      contentWidth: width,
      contentHeight: height,
      isHidden,
      transitionState,
    } = options;
    const {
      ref: htmlRef,
      style: htmlStyle,
      onTransitionEnd: htmlOnTransitionEnd,
      ...restHtmlProps
    } = htmlProps;

    const onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);
    const onTransitionEnd = React.useCallback(
      (event: React.TransitionEvent) => {
        onTransitionEndRef.current?.(event);

        onEnd?.(event);
      },
      [onEnd, onTransitionEndRef],
    );

    const style = {
      "--content-height": height ? `${height}px` : undefined,
      "--content-width": width ? `${width}px` : undefined,
      display: isHidden ? "none" : undefined,
      ...htmlStyle,
    };

    return {
      ref: useForkRef(presenceRef, htmlRef),
      id: baseId,
      hidden: isHidden,
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
