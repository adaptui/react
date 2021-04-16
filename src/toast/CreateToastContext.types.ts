import { DefaultToast, StateReturnType } from "./index";

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

export type CreateToastStoreReturn<T extends DefaultToast, Content> = [
  React.FC<Partial<DefaultToastOptions<T>>>,
  () => ToastStore<T>,
  () => CreateToast<T, Content>,
  () => ToastHandlers<T, Content>,
];
