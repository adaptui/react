// Core Logic for transition is based on https://github.com/roginfarrer/react-collapsed
import * as React from "react";
import { flushSync } from "react-dom";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef, useLiveRef, useUpdateEffect } from "reakit-utils";
import raf from "raf";

import { createComposableHook } from "../system";

import { DISCLOSURE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";
import {
  getAutoSizeDuration,
  getElementHeight,
  getElementWidth,
} from "./helpers";

export type DisclosureContentOptions = BoxOptions &
  Pick<
    DisclosureStateReturn,
    | "baseId"
    | "expanded"
    | "contentSize"
    | "duration"
    | "direction"
    | "easing"
    | "onCollapseEnd"
    | "onCollapseStart"
    | "onExpandEnd"
    | "onExpandStart"
  > & {};

export type DisclosureContentHTMLProps = BoxHTMLProps;

export type DisclosureContentProps = DisclosureContentOptions &
  DisclosureContentHTMLProps;

export const showMoreComposableContent = createComposableHook<
  DisclosureContentOptions,
  DisclosureContentHTMLProps
>({
  name: "DisclosureContent",
  compose: useBox,
  keys: DISCLOSURE_CONTENT_KEYS,

  useProps(options, htmlProps) {
    const {
      contentSize,
      expanded,
      direction,
      duration,
      easing,
      onCollapseEnd,
      onCollapseStart,
      onExpandEnd,
      onExpandStart,
    } = options;
    const {
      ref: htmlRef,
      style: htmlStyle,
      onTransitionEnd: htmlOnTransitionEnd,
      ...restHtmlProps
    } = htmlProps;
    const ref = React.useRef<HTMLElement>(null);
    const onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);
    const isVertical = direction === "vertical";
    const currentSize = isVertical ? "height" : "width";
    const getCurrentSizeStyle = React.useCallback(
      (size: number) => ({
        [currentSize]: `${size}px`,
      }),
      [currentSize],
    );
    const collapsedStyles = React.useMemo(() => {
      return {
        ...getCurrentSizeStyle(contentSize),
        overflow: "hidden",
      };
    }, [contentSize, getCurrentSizeStyle]);

    const [styles, setStylesRaw] = React.useState<React.CSSProperties>(
      expanded ? {} : collapsedStyles,
    );
    const setStyles = (newStyles: {} | ((oldStyles: {}) => {})): void => {
      // We rely on reading information from layout
      // at arbitrary times, so ensure all style changes
      // happen before we might attempt to read them.
      flushSync(() => {
        setStylesRaw(newStyles);
      });
    };
    const mergeStyles = React.useCallback((newStyles: {}): void => {
      setStyles(oldStyles => ({ ...oldStyles, ...newStyles }));
    }, []);

    function getTransitionStyles(size: number | string): {
      transition?: string;
    } {
      const _duration = duration || getAutoSizeDuration(size);

      return {
        transition: `${currentSize} ${_duration}ms ${easing}`,
      };
    }

    useUpdateEffect(() => {
      if (expanded) {
        raf(() => {
          onExpandStart?.();

          mergeStyles({
            willChange: `${currentSize}`,
            overflow: "hidden",
          });

          raf(() => {
            const size = isVertical
              ? getElementHeight(ref)
              : getElementWidth(ref);

            mergeStyles({
              ...getTransitionStyles(size),
              ...(isVertical ? { height: size } : { width: size }),
            });
          });
        });
      } else {
        raf(() => {
          onCollapseStart?.();

          const size = isVertical
            ? getElementHeight(ref)
            : getElementWidth(ref);

          mergeStyles({
            willChange: `${currentSize}`,
            ...(isVertical ? { height: size } : { width: size }),
            ...getTransitionStyles(size),
          });
          raf(() => {
            mergeStyles({
              ...getCurrentSizeStyle(contentSize),
              overflow: "hidden",
            });
          });
        });
      }
    }, [expanded]);

    const onTransitionEnd = React.useCallback(
      (event: React.TransitionEvent) => {
        onTransitionEndRef.current?.(event);

        if (event.defaultPrevented) return;

        // Sometimes onTransitionEnd is triggered by another transition,
        // such as a nested collapse panel transitioning. But we only
        // want to handle this if this component's element is transitioning
        if (
          event.target !== ref.current ||
          event.propertyName !== currentSize
        ) {
          return;
        }

        // The height comparisons below are a final check before
        // completing the transition
        // Sometimes this callback is run even though we've already begun
        // transitioning the other direction
        // The conditions give us the opportunity to bail out,
        // which will prevent the collapsed content from flashing on the screen
        const stylesSize = isVertical ? styles.height : styles.width;

        if (expanded) {
          const size = isVertical
            ? getElementHeight(ref)
            : getElementWidth(ref);

          // If the height at the end of the transition
          // matches the height we're animating to,
          if (size === stylesSize) {
            setStyles({});
          } else {
            // If the heights don't match, this could be due the height
            // of the content changing mid-transition
            mergeStyles({
              ...getCurrentSizeStyle(contentSize),
            });
          }

          onExpandEnd?.();

          // If the height we should be animating to matches the collapsed height,
          // it's safe to apply the collapsed overrides
        } else if (stylesSize === `${contentSize}px`) {
          setStyles(collapsedStyles);

          onCollapseEnd?.();
        }
      },
      [
        onTransitionEndRef,
        currentSize,
        isVertical,
        styles.height,
        styles.width,
        expanded,
        contentSize,
        onExpandEnd,
        mergeStyles,
        getCurrentSizeStyle,
        collapsedStyles,
        onCollapseEnd,
      ],
    );

    const style = { ...styles, ...htmlStyle };

    return {
      ref: useForkRef(ref, htmlRef),
      id: options.baseId,
      "aria-hidden": !expanded,
      style,
      onTransitionEnd,
      ...restHtmlProps,
    };
  },
});

export const useDisclosureContent = showMoreComposableContent();

export const DisclosureContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDisclosureContent,
});
