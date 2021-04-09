import * as React from "react";
import { createContext } from "@chakra-ui/react-utils";

import {
  genId,
  ActionType,
  useToastState,
  DefaultToast,
  StateReturnType,
} from "./index";

export type DefaultToastOptions<T extends DefaultToast> = Omit<
  T,
  "id" | "visible" | "reverseOrder" | "createdAt"
>;

export type DefaultToastProviderOptions<T extends DefaultToast> = Partial<
  DefaultToastOptions<T>
>;

export type ConfigurableToastOptions<T extends DefaultToast> = Omit<
  T,
  "visible"
>;

export type ToastOptions<T extends DefaultToast> = Partial<
  ConfigurableToastOptions<T>
>;

export interface ToastStore<T extends DefaultToast>
  extends StateReturnType<T> {}

export interface CreateToast<T extends DefaultToast, Content> {
  createToast: CreateToastHandler<T, Content>;
}

export type CreateToastHandler<T extends DefaultToast, Content> = (
  content: Content,
  options?: ToastOptions<T>,
) => T;

export type AddToast<T extends DefaultToast, Content> = (
  content: Content,
  options?: ToastOptions<T>,
) => string;

export type ShowToast<T extends DefaultToast, Content> = (
  content: Content,
  options?: ToastOptions<T>,
) => string;

export type UpdateToast<T extends DefaultToast> = (
  toastId: string,
  toast: Partial<T>,
) => void;

export type UpdateFieldToast<T extends DefaultToast> = (
  field: keyof T,
  fieldValue: any,
  toast: Partial<T>,
) => void;

export type UpdateAllToast<T extends DefaultToast> = (
  toast: Partial<T>,
) => void;

export type DismissToast = (toastId?: string) => void;

export type RemoveToast = (toastId?: string) => void;

export type ToastHandlers<T extends DefaultToast, Content> = {
  addToast: AddToast<T, Content>;
  showToast: ShowToast<T, Content>;
  updateToast: UpdateToast<T>;
  updateFieldToast: UpdateFieldToast<T>;
  updateAllToast: UpdateAllToast<T>;
  dismissToast: DismissToast;
  removeToast: RemoveToast;
};

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

  const ToastProvider: React.FC<DefaultToastProviderOptions<T>> = props => {
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
        (({
          visible: false,
          reverseOrder: true,
          createdAt: Date.now(),
          ...defaultOptions,
          ...rest,
          ...opts,
          content,
          id: opts?.id || genId(),
        } as unknown) as T),
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

export type CreateToastStoreReturn<T extends DefaultToast, Content> = [
  React.FC<Partial<DefaultToastOptions<T>>>,
  () => ToastStore<T>,
  () => CreateToast<T, Content>,
  () => ToastHandlers<T, Content>,
];
