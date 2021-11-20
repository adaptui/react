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

export type useAnimationPresenceSizeProps = {
  present: boolean;
  visible: boolean;
};

export const useAnimationPresenceSize = (
  props: useAnimationPresenceSizeProps,
) => {
  const { present, visible } = props;
  const ref = React.useRef<HTMLElement>(null);
  const [isPresent, setIsPresent] = React.useState(present);
  const heightRef = React.useRef<number | undefined>(0);
  const height = heightRef.current;
  const widthRef = React.useRef<number | undefined>(0);
  const width = widthRef.current;

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

  return { isPresent, height, width, ref };
};

export type UseAnimationPresenceSizeReturnType = ReturnType<
  typeof useAnimationPresenceSize
>;

export type TransitionState = "enter" | "leave" | null;

export type useTransitionPresenceProps = {
  transition: boolean;
  visible: boolean;
};

export const useTransitionPresence = (props: useTransitionPresenceProps) => {
  const { transition, visible } = props;
  const [transitionState, setTransitionState] =
    React.useState<TransitionState>(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const lastVisible = useLastValue(visible);

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

  const onEnd = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (!isSelfTarget(event)) return;
      if (!transition) return;
      if (!transitioning) return;

      // Ignores number animated
      setTransitioning(false);
    },
    [transition, transitioning],
  );

  return { transitionState, transitioning, onEnd };
};

export type UseTransitionPresenceReturnType = ReturnType<
  typeof useTransitionPresence
>;
