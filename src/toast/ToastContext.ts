import React from "react";
import { ToastStateReturn } from "./ToastState";
import { ToastTypes } from "./ToastProvider";

interface IToastContext extends ToastStateReturn {
  toastTypes: ToastTypes;
}

export const ToastContext = React.createContext<IToastContext | null>(null);
export const useToast = () => {
  const ctx = React.useContext(ToastContext);

  if (!ctx) {
    throw Error(
      "The `useToasts` hook must be called from a descendent of the `ToastProvider`.",
    );
  }

  return ctx;
};
