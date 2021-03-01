import * as React from "react";

import { useToastStore, useToasters } from "./index";

export const useToasts = () => {
  const { toasts } = useToastStore();
  const { updateToast, removeToast, dismissToast } = useToasters();

  React.useEffect(() => {
    const now = Date.now();
    const timeouts = toasts.map(t => {
      if (t.duration === Infinity) {
        return;
      }

      if (t.pausedAt) return;

      const durationLeft =
        (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          removeToast(t.id);
        }
        return;
      }

      return setTimeout(() => removeToast(t.id), durationLeft);
    });

    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, removeToast]);

  function startPause(toastId: string) {
    const index = toasts.findIndex(toast => toast.id === toastId);
    const toast = toasts[index];
    if (toast.duration === Infinity) {
      return;
    }

    updateToast(toastId, { pausedAt: Date.now() });
  }

  function endPause(toastId: string) {
    const index = toasts.findIndex(toast => toast.id === toastId);
    const toast = toasts[index];

    if (toast.duration === Infinity) {
      return;
    }

    const now = Date.now();
    const diff = now - (toast.pausedAt || 0);

    updateToast(toastId, {
      pausedAt: undefined,
      pauseDuration: toast.pauseDuration + diff,
    });
  }

  return { toasts, startPause, endPause, removeToast, dismissToast };
};
