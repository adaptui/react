import { ToastStateReturn } from "./ToastState";
import { ToastTypes } from "./ToastProvider";
import { createContext } from "@chakra-ui/utils";

interface IToastContext extends ToastStateReturn {
  toastTypes: ToastTypes;
}

const context = createContext<IToastContext>({
  name: "useToast",
  errorMessage:
    "The `useToasts` hook must be called from a descendent of the `ToastProvider`.",
  strict: true,
});

export const useToast = context[1];
export const ToastContext = context[2];
export const ToastContextProvider = context[0];
