import * as React from "react";
import { createContext } from "@chakra-ui/react-utils";

import type {
  AddToast,
  CreateToast,
  CreateToastStoreReturn,
  DefaultToastOptions,
  DefaultToastProviderOptions,
  DismissToast,
  RemoveToast,
  ShowToast,
  ToastHandlers,
  ToastOptions,
  ToastStore,
  UpdateAllToast,
  UpdateFieldToast,
  UpdateToast,
} from "./CreateToastContext.types";
import { ActionType, DefaultToast, genId, useToastState } from "./index";

export function createToastStore<T extends DefaultToast, Content>(
  defaultOptions: DefaultToastOptions<T>,
) {
  const [ToastStoreProvider, useToastStore] = createContext<ToastStore<T>>({
    strict: false,
    name: "ToastsState",
    errorMessage: "useToastStore must be used within ToastProvider",
  });

  const [CreateToastProvider, useCreateToast] = createContext<
    CreateToast<T, Content>
  >({
    strict: false,
    name: "CreateToast",
    errorMessage: "useCreateToast must be used within ToastProvider",
  });

  const [ToastHandlersProvider, useToastHandlers] = createContext<
    ToastHandlers<T, Content>
  >({
    strict: false,
    name: "ToastHandlers",
    errorMessage: "useToastHandlers must be used within ToastProvider",
  });

  const ToastProvider: React.FC<
    React.PropsWithChildren<DefaultToastProviderOptions<T>>
  > = props => {
    const { children, ...rest } = props;
    const { toasts, dispatch } = useToastState<T>();
    const context = React.useMemo(
      () => ({
        toasts,
        dispatch,
      }),
      [toasts, dispatch],
    );

    const createToast = React.useCallback(
      (content: Content, opts?: ToastOptions<T>) =>
        ({
          visible: false,
          reverseOrder: true,
          createdAt: Date.now(),
          ...defaultOptions,
          ...rest,
          ...opts,
          content,
          id: opts?.id || genId(),
        } as unknown as T),
      // Since its only a few object https://twitter.com/dan_abramov/status/1104414272753487872
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(rest)],
    );

    const addToast: AddToast<T, Content> = React.useCallback(
      (content, options) => {
        const toast = createToast(content, options);

        dispatch({
          type: ActionType.ADD_TOAST,
          toast: { ...toast, visible: true },
        });

        return toast.id;
      },
      [createToast, dispatch],
    );

    const showToast: ShowToast<T, Content> = React.useCallback(
      (content, options) => {
        const toast = createToast(content, options);

        dispatch({ type: ActionType.ADD_TOAST, toast });

        setTimeout(() => {
          dispatch({
            type: ActionType.UPDATE_TOAST,
            toast: { ...toast, visible: true },
          });
        }, 0);

        return toast.id;
      },
      [createToast, dispatch],
    );

    const updateToast: UpdateToast<T> = React.useCallback(
      (toastId, toast) => {
        dispatch({
          type: ActionType.UPDATE_TOAST,
          toast: { ...toast, id: toastId },
        });
      },
      [dispatch],
    );

    const updateFieldToast: UpdateFieldToast<T> = React.useCallback(
      (field, fieldValue, toast) => {
        dispatch({
          type: ActionType.UPDATE_FIELD_TOAST,
          field,
          fieldValue,
          toast,
        });
      },
      [dispatch],
    );

    const updateAllToast: UpdateAllToast<T> = React.useCallback(
      toast => {
        dispatch({ type: ActionType.UPDATE_ALL_TOAST, toast });
      },
      [dispatch],
    );

    const dismissToast: DismissToast = React.useCallback(
      toastId => {
        const unmountDuration = defaultOptions.animationDuration;

        dispatch({ type: ActionType.DISMISS_TOAST, toastId });

        setTimeout(() => {
          dispatch({ type: ActionType.REMOVE_TOAST, toastId });
        }, unmountDuration);
      },
      [dispatch],
    );

    const removeToast: RemoveToast = React.useCallback(
      toastId => {
        dispatch({ type: ActionType.REMOVE_TOAST, toastId });
      },
      [dispatch],
    );

    return (
      <ToastStoreProvider value={context}>
        <CreateToastProvider value={{ createToast }}>
          <ToastHandlersProvider
            value={{
              addToast,
              showToast,
              updateToast,
              updateFieldToast,
              updateAllToast,
              dismissToast,
              removeToast,
            }}
          >
            {children}
          </ToastHandlersProvider>
        </CreateToastProvider>
      </ToastStoreProvider>
    );
  };

  ToastProvider.displayName = "ToastStoreProvider";

  return [
    ToastProvider,
    useToastStore,
    useCreateToast,
    useToastHandlers,
  ] as CreateToastStoreReturn<T, Content>;
}
