import React from "react";

import { DismissToast, UpdateToast } from "./CreateToastContext.types";
import { getToast } from "./helpers";
import { TimerToast } from "./ToastTypes";

export const useToastTimer = (
  toasts: TimerToast[],
  updateToast: UpdateToast<TimerToast>,
  dismissToast: DismissToast,
) => {
  React.useEffect(() => {
    const now = Date.now();
    const timeouts = toasts.map(t => {
      if (!t.autoDismiss) return undefined;
      if (t.pausedAt) return undefined;

      const durationLeft =
        (t.dismissDuration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          dismissToast(t.id);
        }
        return undefined;
      }

      return setTimeout(() => {
        dismissToast(t.id);
      }, durationLeft);
    });

    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, dismissToast]);

  const pauseTimer = React.useCallback(
    (toastId: string) => {
      const toast = getToast<TimerToast>(toasts, toastId);

      if (!toast?.autoDismiss) return;

      updateToast(toastId, { pausedAt: Date.now() });
    },
    [toasts, updateToast],
  );

  const resumeTimer = React.useCallback(
    (toastId: string) => {
      const toast = getToast(toasts, toastId);

      if (!toast?.autoDismiss) return;

      const now = Date.now();
      const diff = now - (toast.pausedAt || 0);

      updateToast(toastId, {
        pausedAt: null,
        pauseDuration: toast.pauseDuration + diff,
      });
    },
    [toasts, updateToast],
  );

  return { resumeTimer, pauseTimer };
};
