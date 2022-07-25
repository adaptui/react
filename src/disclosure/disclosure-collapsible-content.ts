import * as React from "react";
import { flushSync } from "react-dom";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { DisclosureState } from "ariakit/disclosure";
import {
  useEvent,
  useForkRef,
  useId,
  useUpdateEffect,
} from "ariakit-utils/hooks";
import { As, Options, Props } from "ariakit-utils/types";
import raf from "raf";

import {
  getAutoSizeDuration,
  getElementHeight,
  getElementWidth,
} from "./__utils";

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that can be shown or hidden.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const state = useDisclosureState();
 * const props = useDisclosureCollapsibleContent({ state });
 * <Disclosure state={state}>Disclosure</Disclosure>
 * <Role {...props}>Content</Role>
 * ```
 */
export const useDisclosureCollapsibleContent =
  createHook<DisclosureCollapsibleContentOptions>(
    ({
      state,
      direction = "vertical",
      contentSize = 0,
      easing = "cubic-bezier(0.4, 0, 0.2, 1)",
      duration,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      ...props
    }) => {
      const id = useId(props.id);
      const contentRef = React.useRef<HTMLElement>(null);

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
        state.open ? {} : collapsedStyles,
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
        if (state.open) {
          raf(() => {
            onExpandStart?.();

            mergeStyles({
              willChange: `${currentSize}`,
              overflow: "hidden",
            });

            raf(() => {
              const size = isVertical
                ? getElementHeight(contentRef)
                : getElementWidth(contentRef);

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
              ? getElementHeight(contentRef)
              : getElementWidth(contentRef);

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
      }, [state.open]);

      const onTransitionEndProp = props.onTransitionEnd;
      const onTransitionEnd = useEvent(
        (event: React.TransitionEvent<HTMLDivElement>) => {
          onTransitionEndProp?.(event);

          if (event.defaultPrevented) return;

          // Sometimes onTransitionEnd is triggered by another transition,
          // such as a nested collapse panel transitioning. But we only
          // want to handle this if this component's element is transitioning
          if (
            event.target !== contentRef.current ||
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

          if (state.open) {
            const size = isVertical
              ? getElementHeight(contentRef)
              : getElementWidth(contentRef);

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
      );

      const style = { ...styles, ...props.style };

      props = {
        id,
        hidden: !state.mounted,
        ...props,
        ref: useForkRef(
          id ? state.setContentElement : null,
          contentRef,
          props.ref,
        ),
        onTransitionEnd,
        style,
      };

      return props;
    },
  );

export const DisclosureCollapsibleContent =
  createComponent<DisclosureCollapsibleContentOptions>(props => {
    const htmlProps = useDisclosureCollapsibleContent(props);

    return createElement("div", htmlProps);
  });

export type DisclosureCollapsibleContentOptions<T extends As = "div"> =
  Options<T> & {
    /**
     * Object returned by the `useDisclosureState` hook.
     */
    state: DisclosureState;
    /**
     * Direction of the transition.
     *
     * @default vertical
     */
    direction?: "vertical" | "horizontal";
    /**
     * Size of the content.
     *
     * @default 0
     */
    contentSize?: number;
    /**
     * Transition Easing.
     *
     * @default cubic-bezier(0.4, 0, 0.2, 1)
     */
    easing?: string;
    /**
     * Duration of the transition.
     * By default the duration is calculated based on the size of change.
     */
    duration?: number;
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

export type DisclosureCollapsibleContentProps<T extends As = "div"> = Props<
  DisclosureCollapsibleContentOptions<T>
>;
