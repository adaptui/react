// Core Logic for transition is based on https://github.com/roginfarrer/react-collapsed
import * as React from "react";
import { flushSync } from "react-dom";
import { createComponent } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { useForkRef, useLiveRef, useUpdateEffect } from "reakit-utils";
import raf from "raf";

import { createComposableHook } from "../system";

import { DISCLOSURE_COLLAPSE_CONTENT_KEYS } from "./__keys";
import { DisclosureStateReturn } from "./DisclosureState";
import {
  getAutoSizeDuration,
  getElementHeight,
  getElementWidth,
} from "./helpers";

export type DisclosureCollapseContentOptions = BoxOptions &
  Pick<DisclosureStateReturn, "baseId" | "visible"> & {
    /**
     * Direction of the transition.
     *
     * @default vertical
     */
    direction: "vertical" | "horizontal";

    /**
     * Size of the content.
     *
     * @default 0
     */
    contentSize: number;

    /**
     * Duration of the transition.
     * By default the duration is calculated based on the size of change.
     */
    duration?: number;

    /**
     * Transition Easing.
     *
     * @default cubic-bezier(0.4, 0, 0.2, 1)
     */
    easing: string;

    /**
     * Callback called before the expand transition starts.
     */
    onExpandStart?: () => void;

    /**
     * Callback called after the expand transition ends.
     */
    onExpandEnd?: () => void;

    /**
     * Callback called before the collapse transition starts.
     */
    onCollapseStart?: () => void;

    /**
     * Callback called after the collapse transition ends..
     */
    onCollapseEnd?: () => void;
  };

export type DisclosureCollapseContentHTMLProps = BoxHTMLProps;

export type DisclosureCollapseContentProps = DisclosureCollapseContentOptions &
  DisclosureCollapseContentHTMLProps;

export const disclosureCollapseComposableContent = createComposableHook<
  DisclosureCollapseContentOptions,
  DisclosureCollapseContentHTMLProps
>({
  name: "DisclosureCollapseContent",
  compose: useBox,
  keys: DISCLOSURE_COLLAPSE_CONTENT_KEYS,

  useOptions(options, htmlProps) {
    const {
      direction = "vertical",
      contentSize = 0,
      easing = "cubic-bezier(0.4, 0, 0.2, 1)",
      ...restOptions
    } = options;
    return { direction, contentSize, easing, ...restOptions };
  },

  useProps(options, htmlProps) {
    const {
      contentSize,
      visible,
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
      visible ? {} : collapsedStyles,
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
      if (visible) {
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
    }, [visible]);

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

        if (visible) {
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
        visible,
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
      "aria-hidden": !visible,
      style,
      onTransitionEnd,
      ...restHtmlProps,
    };
  },
});

export const useDisclosureCollapseContent =
  disclosureCollapseComposableContent();

export const DisclosureCollapseContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDisclosureCollapseContent,
});
