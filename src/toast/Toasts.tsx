import * as React from "react";

import { useToastStore, useToasters, getToast } from "./index";

export const useToasts = () => {
  const { toasts } = useToastStore();
  const { updateToast, upsertToast, removeToast, dismissToast } = useToasters();

  React.useEffect(() => {
    const now = Date.now();
    const timeouts = toasts.map(t => {
      if (!t.autoDismiss) return;
      if (t.pausedAt) return;

      const durationLeft =
        (t.dismissDuration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          dismissToast(t.id);
        }
        return;
      }

      return setTimeout(() => dismissToast(t.id), durationLeft);
    });

    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, dismissToast]);

  function startPause(toastId: string) {
    const toast = getToast(toasts, toastId);

    if (!toast.autoDismiss) return;

    updateToast(toastId, { pausedAt: Date.now() });
  }

  function endPause(toastId: string) {
    const toast = getToast(toasts, toastId);

    if (!toast.autoDismiss) return;

    const now = Date.now();
    const diff = now - (toast.pausedAt || 0);

    updateToast(toastId, {
      pausedAt: null,
      pauseDuration: toast.pauseDuration + diff,
    });
  }

  return {
    toasts,
    startPause,
    endPause,
    removeToast,
    dismissToast,
    updateToast,
    upsertToast,
  };
};
