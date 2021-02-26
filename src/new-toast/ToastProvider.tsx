import * as React from "react";
import { createContext } from "@chakra-ui/utils";

import { Toast, useToastState, State, Action } from "./index";

export type ToastStore = State<Toast> & {
  dispatch: React.Dispatch<Action<Toast>>;
};

const [ToastStoreProvider, useToastStore] = createContext<ToastStore>({
  errorMessage: "useToastStore must be used within ToastProvider",
  name: "ToastsState",
  strict: false,
});

export { useToastStore };

export const ToastProvider = (props: any) => {
  const { children } = props;
  const store = useToastState<Toast>();

  return <ToastStoreProvider value={store}>{children}</ToastStoreProvider>;
};
