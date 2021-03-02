import * as React from "react";
import { createContext } from "@chakra-ui/utils";

import {
  Toast,
  ToastOptions,
  useToastState,
  StateReturnType,
  DefaultToastOptions,
} from "./index";

export interface ToastStore extends StateReturnType<Toast> {
  defaultOptions: DefaultToastOptions;
}

const [ToastStoreProvider, useToastStore] = createContext<ToastStore>({
  strict: false,
  name: "ToastsState",
  errorMessage: "useToastStore must be used within ToastProvider",
});

export { useToastStore };

const defaultOptions: DefaultToastOptions = {
  type: "info",
  placement: "bottom-center",
  autoDismiss: true,
  dismissDuration: 3000,
  animationDuration: 0,
  reverseOrder: false,
};

export const ToastProvider: React.FC<ToastOptions> = props => {
  const { children, ...rest } = props;
  const store = useToastState<Toast>();
  const context = { ...store, defaultOptions: { ...defaultOptions, ...rest } };

  return <ToastStoreProvider value={context}>{children}</ToastStoreProvider>;
};
