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
    animationPresent?: boolean;

    /**
     * Whether it uses animation or not.
     */
    transitionPresent?: boolean;

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
    onMountStart?: (value: boolean) => void;
    onUnMountStart?: (value: boolean) => void;
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
    const {
      visible,
      animationPresent = false,
      transitionPresent = false,
      onMountStart,
      onUnMountStart,
    } = options;
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
      transition: transitionPresent,
      visible,
    });

    React.useEffect(() => {
      if (visible && !present) {
        onMountStart?.(true);
      } else {
        onMountStart?.(false);
      }

      if (!visible && present) {
        onUnMountStart?.(true);
      } else {
        onUnMountStart?.(false);
      }
    }, [visible, present, onMountStart, onUnMountStart]);

    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isVisible = visible || isPresent;
    const isHidden =
      (animationPresent && !isVisible) ||
      (transitionPresent && !visible && !transitioning) ||
      (!animationPresent && !transitionPresent && !isVisible);

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
      transitionPresent,
      animationPresent,
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
        (transitionPresent && transitionState === "enter") ||
        (animationPresent && visible)
          ? ""
          : undefined,
      "data-leave":
        (transitionPresent && transitionState === "leave") ||
        (animationPresent && !visible)
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
