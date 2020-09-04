import React from "react";
import ReactDOM from "react-dom";

import useToastState, { IToast } from "./ToastState";
import { ToastController } from "./ToastController";
import { ToastStateReturn } from "./ToastState";
import { ToastContext } from "./ToastContext";

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

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

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
  toastTypes: ToastTypes;
  autoDismiss?: boolean;
  animationTimeout?: number;
  toastWrapper?: TToastWrapper;
  placement?: Placements;
};

export const ToastProvider: React.FC<IToastProvider> = ({
  children,
  toastTypes,
  autoDismiss,
  animationTimeout,
  toastWrapper: ToastWrapperComponent = ({ children }) => children,
  placement: defaultPlacement = "bottom-center",
}) => {
  const portalTarget = canUseDOM ? document.body : null;
  const state = useToastState({ animationTimeout });
  const [inheritedAutoDismiss, setAutodismiss] = React.useState(true);

  React.useEffect(() => {
    setAutodismiss(autoDismiss === undefined ? true : autoDismiss);
  }, [autoDismiss]);

  return (
    <ToastContext.Provider value={{ ...state, toastTypes }}>
      {portalTarget
        ? ReactDOM.createPortal(
            state.getToastToRender(defaultPlacement, (position, toastList) => {
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
                    ({
                      id,
                      type,
                      content,
                      timeout,
                      autoDismiss,
                      isVisible,
                    }) => {
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
                            duration={timeout || DEFAULT_TIMEOUT}
                            autoDismiss={
                              autoDismiss !== undefined
                                ? autoDismiss
                                : inheritedAutoDismiss
                            }
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
            }),
            portalTarget || document.body,
          )
        : null}
      {children}
    </ToastContext.Provider>
  );
};
