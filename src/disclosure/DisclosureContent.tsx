// Inspired from Radix UI https://github.com/radix-ui/primitives/tree/main/packages/react/collapsible
import * as React from "react";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useLiveRef } from "reakit-utils";

import { createComposableHook } from "../system";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";
import {
  TransitionState,
  useAnimation,
  useAnimationReturnType,
} from "./helpers";

export type DisclosureContentOptions = BoxOptions &
  Pick<DisclosureStateReturn, "baseId" | "visible"> & {
    animationPresent?: boolean;
    state: TransitionState;
    animating: useAnimationReturnType["animating"];
    onEnd: useAnimationReturnType["onEnd"];
    isVisible: boolean;
    isHidden: boolean;
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
    const { visible, animationPresent = false, ...restOptions } = options;
    const { state, animating, onEnd } = useAnimation({
      visible,
    });

    const isVisible = visible && animating;
    const isHidden = !visible && !animating;

    return {
      animationPresent,
      visible,
      ...restOptions,
      isVisible,
      isHidden,
      state,
      animating,
      onEnd,
    };
  },

  useProps(options, htmlProps) {
    const { baseId, onEnd, isHidden, isVisible, state, animationPresent } =
      options;
    const {
      style: htmlStyle,
      onTransitionEnd: htmlOnTransitionEnd,
      onAnimationEnd: htmlOnAnimationEnd,
      ...restHtmlProps
    } = htmlProps;

    const onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);
    const onAnimationEndRef = useLiveRef(htmlOnAnimationEnd);

    const onTransitionEnd = React.useCallback(
      (event: React.TransitionEvent) => {
        onTransitionEndRef.current?.(event);

        onEnd?.(event);
      },
      [onEnd, onTransitionEndRef],
    );

    const onAnimationEnd = React.useCallback(
      (event: React.AnimationEvent) => {
        onAnimationEndRef.current?.(event);
        onEnd?.(event);
      },
      [onAnimationEndRef, onEnd],
    );

    const style = {
      display: isHidden ? "none" : undefined,
      ...htmlStyle,
    };

    return {
      id: baseId,
      hidden: isHidden,
      "data-enter": animationPresent
        ? isVisible
          ? ""
          : undefined
        : state === "enter"
        ? ""
        : undefined,
      "data-leave": state === "leave" ? "" : undefined,
      onTransitionEnd,
      onAnimationEnd,
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
