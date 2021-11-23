import * as React from "react";
import { isSelfTarget } from "reakit-utils";
import { useSafeLayoutEffect } from "@chakra-ui/hooks";

function useLastValue<T>(value: T) {
  const lastValue = React.useRef<T | null>(null);

  useSafeLayoutEffect(() => {
    lastValue.current = value;
  }, [value]);

  return lastValue;
}

export type useAnimationProps = {
  visible: boolean;
};

export const useAnimation = (props: useAnimationProps) => {
  const { visible } = props;

  const [animating, setAnimating] = React.useState(false);
  const lastVisible = useLastValue(visible);
  const visibleHasChanged =
    lastVisible.current != null && lastVisible.current !== visible;
  const [state, setState] = React.useState<TransitionState>(null);
  const raf = React.useRef(0);

  if (!animating && visibleHasChanged) {
    // Sets animating to true when when visible is updated
    setAnimating(true);
  }

  React.useEffect(() => {
    // Double RAF is needed so the browser has enough time to paint the
    // default styles before processing the `data-enter` attribute. Otherwise
    // it wouldn't be considered a transition.
    // See https://github.com/reakit/reakit/issues/643
    raf.current = window.requestAnimationFrame(() => {
      raf.current = window.requestAnimationFrame(() => {
        if (visible) {
          setState("enter");
        } else if (animating) {
          setState("leave");
        } else {
          setState(null);
        }
      });
    });

    return () => window.cancelAnimationFrame(raf.current);
  }, [visible, animating]);

  const stopAnimation = React.useCallback(() => setAnimating(false), []);

  const onEnd = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (!isSelfTarget(event)) return;
      if (!animating) return;

      // Ignores number animated
      stopAnimation();
    },
    [animating, stopAnimation],
  );

  return { state, animating, onEnd };
};

export type useAnimationReturnType = ReturnType<typeof useAnimation>;

export type TransitionState = "enter" | "leave" | null;

export function getElementHeight(
  el: React.RefObject<HTMLElement> | { current?: { scrollHeight: number } },
): string | number {
  if (!el?.current) {
    return "auto";
  }

  return el.current.scrollHeight;
}

export function getElementWidth(
  el: React.RefObject<HTMLElement> | { current?: { scrollWidth: number } },
): string | number {
  if (!el?.current) {
    return "auto";
  }

  return el.current.scrollWidth;
}

// https://github.com/mui-org/material-ui/blob/da362266f7c137bf671d7e8c44c84ad5cfc0e9e2/packages/material-ui/src/styles/transitions.js#L89-L98
export function getAutoSizeDuration(size: number | string): number {
  if (!size || typeof size === "string") {
    return 0;
  }

  const constant = size / 36;

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
