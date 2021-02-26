import * as React from "react";

import { useToastStore } from "./index";
import { useToasters } from "./Toasters";
import { ActionType } from "./ToastState";

export const useToasts = () => {
  const { toasts, dispatch } = useToastStore();
  const { removeToast } = useToasters();

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
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { id: toastId, pausedAt: Date.now() },
    });
  }

  function endPause(toastId: string) {
    const index = toasts.findIndex(toast => toast.id === toastId);
    const toast = toasts[index];
    const now = Date.now();
    const diff = now - (toast.pausedAt || 0);

    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: {
        id: toastId,
        pausedAt: undefined,
        pauseDuration: toast.pauseDuration + diff,
      },
    });
  }

  return { toasts, startPause, endPause };
};
