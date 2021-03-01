import * as React from "react";
import { createContext } from "@chakra-ui/utils";

import {
  Toast,
  useToastState,
  StateReturnType,
  DefaultToastOptions,
} from "./index";

export interface ToastStore extends StateReturnType<Toast> {}

const [ToastStoreProvider, useToastStore] = createContext<ToastStore>({
  strict: false,
  name: "ToastsState",
  errorMessage: "useToastStore must be used within ToastProvider",
});

export { useToastStore };

const defaultOptions: DefaultToastOptions = {
  type: "info",
  placement: "bottom-right",
  duration: 5000,
  reverseOrder: false,
};

export const ToastProvider: React.FC<DefaultToastOptions> = props => {
  const { children, ...rest } = props;
  const store = useToastState<Toast>({ ...defaultOptions, ...rest });

  return <ToastStoreProvider value={store}>{children}</ToastStoreProvider>;
};
