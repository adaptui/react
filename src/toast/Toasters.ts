import {
  genId,
  Toast,
  Content,
  ActionType,
  useToastStore,
  CreateToastOptions,
} from "./index";

export type ToastHandler = (
  content: Content,
  options?: CreateToastOptions,
) => string;

export type CreateToastHandler = (
  content: Content,
  options?: CreateToastOptions,
) => Toast;

export const useCreateToast = (): CreateToastHandler => {
  const { defaultOptions } = useToastStore();

  return (content, opts) => ({
    createdAt: Date.now(),
    visible: false,
    pausedAt: null,
    pauseDuration: 0,
    content,
    ...defaultOptions,
    ...opts,
    id: opts?.id || genId(),
  });
};

export const useAddToast = (): ToastHandler => {
  const { dispatch } = useToastStore();
  const createToast = useCreateToast();

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
  const createToast = useCreateToast();

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

export const useUpsertToast = (): ToastHandler => {
  const { dispatch } = useToastStore();
  const createToast = useCreateToast();

  return (content, options) => {
    const toast = createToast(content, options);

    dispatch({ type: ActionType.UPSERT_TOAST, toast });

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

export const useDismissToast = () => {
  const { dispatch, defaultOptions } = useToastStore();

  return (toastId?: string) => {
    const unmountDuration = defaultOptions.animationDuration;

    dispatch({ type: ActionType.DISMISS_TOAST, toastId });

    setTimeout(() => {
      dispatch({ type: ActionType.REMOVE_TOAST, toastId });
    }, unmountDuration);
  };
};

export const useRemoveToast = () => {
  const { dispatch } = useToastStore();

  return (toastId?: string) =>
    dispatch({ type: ActionType.REMOVE_TOAST, toastId });
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
    upsertToast,
    updateToast,
    dismissToast,
    removeToast,
  };
};
