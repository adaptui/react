import { Toast } from "../index";

export const genId = (() => {
  let count = 0;
  return () => {
    return (++count).toString();
  };
})();

export const getToast = (toasts: Toast[], toastId: string): Toast => {
  const index = toasts.findIndex(toast => toast.id === toastId);
  return toasts[index];
};
