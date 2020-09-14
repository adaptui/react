import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Placements } from "./ToastProvider";

type JSXFunction = (props: any) => JSX.Element;
type StringOrElement = string | JSXFunction;

export interface IToast {
  id: string;
  type?: string;
  content: StringOrElement;
  timeout?: number;
  placement?: Placements;
  autoDismiss?: boolean;
  isVisible?: boolean;
}

export type ToastList = Record<string, IToast>;

type GetToastToRenderType = (
  defaultPlacement: Placements,
  callback: (position: Placements, toastList: IToast[]) => void,
) => Array<any>;

interface ToastStateProps {
  animationTimeout?: number;
}

export const useToastState = ({ animationTimeout = 0 }: ToastStateProps) => {
  const [toasts, setToasts] = React.useState<ToastList>({});

  // toggle can be used to just hide/show the toast instead of removing it.
  // used for animations, since we don't want to unmount the component directly
  const toggle = React.useCallback(
    ({ id, isVisible }: { id: string; isVisible: boolean }) => {
      setToasts(queue => ({
        ...queue,
        [id]: {
          ...queue[id],
          isVisible,
        },
      }));
    },
    [],
  );

  const show = React.useCallback(
    ({
      type = "",
      content,
      timeout,
      autoDismiss,
      placement,
    }: Omit<IToast, "id" | "isVisible">) => {
      const uid = uuidv4();
      /*
        wait until the next frame so we can animate
        wierd bug while using CSSTrasition
        works fine without RAF & double render when using react spring.
        maybe because of this:- https://youtu.be/mmq-KVeO-uU?t=842
       */
      requestAnimationFrame(() => {
        setToasts(toasts => ({
          ...toasts,
          [uid]: {
            type,
            id: uid,
            content,
            timeout,
            placement,
            autoDismiss,
            isVisible: false,
          },
        }));

        // causes rerender in order to trigger
        // the animation after mount in CSSTrasition
        toggle({ id: uid, isVisible: true });
      });
    },
    [toggle],
  );

  const remove = React.useCallback((id: string) => {
    // need to use callback based setState otherwise
    // the remove function would take the queue as dependency
    // and cause render when changed which would effectively
    // cause the animations to behave strangly.
    setToasts(queue => {
      const newQueue = { ...queue };
      delete newQueue[id];

      return newQueue;
    });
  }, []);

  const hide = React.useCallback(
    (id: string) => {
      toggle({ id, isVisible: false });

      window.setTimeout(() => {
        remove(id);
      }, animationTimeout);
    },
    [toggle, animationTimeout, remove],
  );

  // The idea here is to normalize the [...] single array to object with
  // position keys & arrays containing the toasts
  const getToastToRender: GetToastToRenderType = (
    defaultPlacement,
    callback,
  ) => {
    const toastToRender = {};
    const toastList = Object.keys(toasts);

    for (let i = 0; i < toastList.length; i++) {
      const toast = toasts[toastList[i]];
      const { placement = defaultPlacement } = toast;
      toastToRender[placement] || (toastToRender[placement] = []);

      toastToRender[placement].push(toast);
    }

    return Object.keys(toastToRender).map(position =>
      callback(position as Placements, toastToRender[position]),
    );
  };

  return {
    setToasts,
    getToastToRender,
    toasts,
    toggle,
    show,
    hide,
    remove,
  };
};

export type ToastStateReturn = ReturnType<typeof useToastState>;
