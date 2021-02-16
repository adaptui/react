import React from "react";

import { ToastPlacements } from "./ToastProvider";

export interface Toast {
  /**
   * Unique id for the toast
   */
  id: string;
  /**
   * Type of toast
   */
  type: string;
  /**
   * Content inside the toast
   */
  content?: any;
  /**
   * Sets the placement of the toast
   *
   * @default "bottom-center"
   */
  placement: ToastPlacements;
  /**
   * Timeout after the toast will be removed automatically if autoDismiss is true
   */
  timeout?: number;
  /**
   * If True the toast will automatically dismiss after the specified duration
   */
  autoDismiss?: boolean;
  /**
   * Sets toast initial visibility
   */
  isVisible?: boolean;
}

export type ToastList = Record<string, Toast>;
export type SortedToastList = Record<ToastPlacements, Toast[]>;

interface ToastStateProps {
  defaultPlacement?: ToastPlacements;
  animationTimeout?: number;
}

export const useToastState = ({
  defaultPlacement = "bottom-center",
  animationTimeout = 0,
}: ToastStateProps) => {
  const COUNTER = React.useRef(0);
  const [toasts, setToasts] = React.useState<ToastList>({});
  const sortedToasts = getPlacementSortedToasts(toasts);

  // toggle can be used to just hide/show the toast instead of removing it.
  // used for animations, since we don't want to unmount the component directly
  const toggleToast = React.useCallback(
    ({ id, isVisible }: { id: string; isVisible: boolean }) => {
      setToasts(queue => ({
        ...queue,
        [id]: {
          ...queue[id],
          isVisible,
        },
      }));
    },
    [],
  );

  const showToast = React.useCallback(
    ({
      id: idProps,
      type = "",
      content,
      timeout,
      autoDismiss,
      placement = defaultPlacement,
    }: Partial<Omit<Toast, "isVisible">>) => {
      COUNTER.current = COUNTER.current + 1;
      const id = idProps || `toast-${COUNTER.current}`;

      /*
        wait until the next frame so we can animate
        wierd bug while using CSSTrasition
        works fine without RAF & double render when using react spring.
        maybe because of this:- https://youtu.be/mmq-KVeO-uU?t=842
       */
      requestAnimationFrame(() => {
        setToasts(toasts => ({
          ...toasts,
          [id]: {
            type,
            id,
            content,
            timeout,
            placement,
            autoDismiss,
            isVisible: false,
          },
        }));

        // causes rerender in order to trigger
        // the animation after mount in CSSTrasition
        toggleToast({ id, isVisible: true });
      });
    },
    [defaultPlacement, toggleToast],
  );

  const removeToast = React.useCallback((id: string) => {
    // need to use callback based setState otherwise
    // the remove function would take the queue as dependency
    // and cause render when changed which would effectively
    // cause the animations to behave strangly.
    setToasts(queue => {
      const newQueue = { ...queue };
      delete newQueue[id];

      return newQueue;
    });
  }, []);

  const hideToast = React.useCallback(
    (id: string) => {
      toggleToast({ id, isVisible: false });

      window.setTimeout(() => {
        removeToast(id);
      }, animationTimeout);
    },
    [toggleToast, animationTimeout, removeToast],
  );

  const isToastVisible = React.useCallback(
    (id: string) => Boolean(toasts[id]),
    [toasts],
  );

  return {
    toasts,
    sortedToasts,
    showToast,
    hideToast,
    toggleToast,
    removeToast,
    isToastVisible,
  };
};

export type ToastStateReturn = ReturnType<typeof useToastState>;

function getPlacementSortedToasts(toasts: ToastList) {
  const sortedToasts = {};

  for (const key in toasts) {
    const toast = toasts[key];
    const { placement } = toast;
    const isTop = placement.includes("top");

    sortedToasts[placement] || (sortedToasts[placement] = []);

    if (isTop) {
      sortedToasts[placement].unshift(toast);
    } else {
      sortedToasts[placement].push(toast);
    }
  }

  return sortedToasts as SortedToastList;
}
