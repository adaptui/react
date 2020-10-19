import React from "react";
import ReactDOM from "react-dom";
import { canUseDOM } from "reakit-utils";
import { createContext } from "@chakra-ui/utils";

import { ToastStateReturn } from "./ToastState";
import { ToastController } from "./ToastController";
import { useToastState, IToast } from "./ToastState";

const DEFAULT_TIMEOUT = 5000;
const PLACEMENTS = {
  "top-left": { top: 0, left: 0 },
  "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 0, right: 0 },
  "bottom-left": { bottom: 0, left: 0 },
  "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 0, right: 0 },
};

// let's infer the union types from the placement values instead of hardcoding them
export type Placements = keyof typeof PLACEMENTS;

interface IToastContext extends ToastStateReturn {
  toastTypes: ToastTypes;
}

export const [ToastContextProvider, useToast] = createContext<IToastContext>({
  name: "useToast",
  errorMessage:
    "The `useToasts` hook must be called from a descendent of the `ToastProvider`.",
  strict: true,
});

export type ToastTypes = Record<
  string,
  React.FC<
    Pick<IToast, "content" | "id" | "isVisible"> & {
      remove: ToastStateReturn["remove"];
    }
  >
>;

export type TToastWrapper = (props: any) => React.ReactElement<any>;

type IToastProvider = {
  /**
   * Specify types of toast in an object
   */
  toastTypes: ToastTypes;
  /**
   * If True the toast will automatically dismiss after the specified duration
   */
  autoDismiss?: boolean;
  /**
   * Timeout after the toast will be removed automatically if autoDismiss is true
   *
   * @default 5000
   */
  timeout?: number;
  /**
   * Duration of delay after the toast will be unmounted, so that animations can run
   *
   * @default 0
   */
  animationTimeout?: number;
  /**
   * Callback function to enhance the behaviour of ToastControllers
   */
  toastWrapper?: TToastWrapper;
  /**
   * Placement of the toast on the screen
   */
  placement?: Placements;
};

export const ToastProvider: React.FC<IToastProvider> = ({
  children,
  toastTypes,
  toastWrapper: ToastWrapperComponent = ({ children }) => children,
  animationTimeout,
  autoDismiss: providerAutoDismiss,
  timeout: providerTimeout = DEFAULT_TIMEOUT,
  placement: providerPlacement = "bottom-center",
}) => {
  const portalTarget = canUseDOM ? document.body : null;
  const state = useToastState({ animationTimeout });

  const Toasts = state.getToastToRender(
    providerPlacement,
    (position, toastList) => {
      return (
        <div
          key={position}
          className={`toast__container toast__container--${position}`}
          style={{
            position: "fixed",
            ...PLACEMENTS[position],
          }}
        >
          {toastList.map(
            ({ id, type, content, timeout, autoDismiss, isVisible }) => {
              return (
                <ToastWrapperComponent
                  key={id}
                  id={id}
                  isVisible={isVisible}
                  placement={position}
                >
                  <ToastController
                    id={id}
                    onRequestRemove={state.hide}
                    duration={timeout ?? providerTimeout}
                    autoDismiss={autoDismiss ?? providerAutoDismiss}
                  >
                    {typeof content === "function"
                      ? content({ id, isVisible, remove: state.hide })
                      : toastTypes[type || ""]?.({
                          content,
                          id,
                          remove: state.hide,
                          isVisible,
                        }) || content}
                  </ToastController>
                </ToastWrapperComponent>
              );
            },
          )}
        </div>
      );
    },
  );

  return (
    <ToastContextProvider value={{ ...state, toastTypes }}>
      {children}
      {portalTarget ? ReactDOM.createPortal(Toasts, portalTarget) : Toasts}
    </ToastContextProvider>
  );
};
