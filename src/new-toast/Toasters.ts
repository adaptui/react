import { ActionType, useToastStore, genId } from "./index";
import type { ToastOptions, Toast, Content } from "./index";

type ToastHandler = (content: Content, options?: ToastOptions) => string;

const createToast = (content: Content, opts?: ToastOptions): Toast => ({
  createdAt: Date.now(),
  visible: false,
  pauseDuration: 0,
  reverseOrder: false,
  type: "info",
  placement: "top-right",
  duration: Infinity,
  content,
  ...opts,
  id: opts?.id || genId(),
});

const useAddToast = (): ToastHandler => {
  const { dispatch } = useToastStore();

  return (content, options) => {
    const toast = createToast(content, options);
    dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: { ...toast, visible: true },
    });

    return toast.id;
  };
};

const useShowToast = (): ToastHandler => {
  const { dispatch } = useToastStore();

  return (content, options) => {
    const toast = createToast(content, options);
    dispatch({ type: ActionType.UPSERT_TOAST, toast });

    setTimeout(() => {
      dispatch({
        type: ActionType.UPSERT_TOAST,
        toast: { ...toast, visible: true },
      });
    }, 0);

    return toast.id;
  };
};

const useDismissToast = () => {
  const { dispatch } = useToastStore();

  return (toastId?: string) => {
    dispatch({
      type: ActionType.DISMISS_TOAST,
      toastId,
    });

    setTimeout(() => {
      dispatch({
        type: ActionType.REMOVE_TOAST,
        toastId,
      });
    }, 1000);
  };
};

const useRemoveToast = () => {
  const { dispatch } = useToastStore();

  return (toastId?: string) => {
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId,
    });
  };
};

// Toast Triggers
export const useToasters = () => {
  const addToast = useAddToast();
  const showToast = useShowToast();
  const dismissToast = useDismissToast();
  const removeToast = useRemoveToast();

  return { addToast, showToast, dismissToast, removeToast };
};
