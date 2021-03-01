import { getToast } from "./helpers";
import {
  genId,
  Toast,
  Content,
  ActionType,
  ToastOptions,
  useToastStore,
} from "./index";

export type ToastHandler = (content: Content, options?: ToastOptions) => string;

export const createToast = (content: Content, opts?: ToastOptions): Toast => ({
  createdAt: Date.now(),
  visible: false,
  pauseDuration: 0,
  content,
  ...opts,
  id: opts?.id || genId(),
});

export const useAddToast = (): ToastHandler => {
  const { dispatch } = useToastStore();

  return (content, options) => {
    const toast = createToast(content, options);
    dispatch({
      type: ActionType.ADD_TOAST,
      toast: { ...toast, visible: true },
    });

    return toast.id;
  };
};

export const useShowToast = (): ToastHandler => {
  const { dispatch } = useToastStore();

  return (content, options) => {
    const toast = createToast(content, options);
    dispatch({ type: ActionType.ADD_TOAST, toast });

    setTimeout(() => {
      dispatch({
        type: ActionType.UPDATE_TOAST,
        toast: { ...toast, visible: true },
      });
    }, 0);

    return toast.id;
  };
};

export const useUpdateToast = () => {
  const { dispatch } = useToastStore();

  return (toastId: string, toast: Partial<Toast>) => {
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { ...toast, id: toastId },
    });
  };
};

export const useUpsertToast = (): ToastHandler => {
  const { dispatch } = useToastStore();

  return (content, options) => {
    const toast = createToast(content, options);
    dispatch({ type: ActionType.UPSERT_TOAST, toast });

    return toast.id;
  };
};

export const useDismissToast = () => {
  const { toasts, dispatch } = useToastStore();

  return (toastId?: string) => {
    let duration: number;
    if (!toastId) {
      duration = 0;
    } else {
      const toast = getToast(toasts, toastId);
      duration = toast.duration || 0;
    }

    dispatch({ type: ActionType.DISMISS_TOAST, toastId });

    setTimeout(() => {
      dispatch({ type: ActionType.REMOVE_TOAST, toastId });
    }, duration);
  };
};

export const useRemoveToast = () => {
  const { dispatch } = useToastStore();

  return (toastId?: string) => {
    dispatch({ type: ActionType.REMOVE_TOAST, toastId });
  };
};

// Toast Triggers
export const useToasters = () => {
  const addToast = useAddToast();
  const showToast = useShowToast();
  const updateToast = useUpdateToast();
  const upsertToast = useUpsertToast();
  const dismissToast = useDismissToast();
  const removeToast = useRemoveToast();

  return {
    addToast,
    showToast,
    updateToast,
    upsertToast,
    dismissToast,
    removeToast,
  };
};
