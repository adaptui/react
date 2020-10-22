import { useCallback, useEffect, useRef } from "react";

interface GlobalListeners {
  addGlobalListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addGlobalListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeGlobalListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeGlobalListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

export function useGlobalListeners(): GlobalListeners {
  const globalListeners = useRef(new Map());
  const addGlobalListener = useCallback(
    (eventTarget, type, listener, options) => {
      globalListeners.current.set(listener, { type, eventTarget, options });
      eventTarget.addEventListener(type, listener, options);
    },
    [],
  );
  const removeGlobalListener = useCallback(
    (eventTarget, type, listener, options) => {
      eventTarget.removeEventListener(type, listener, options);
      globalListeners.current.delete(listener);
    },
    [],
  );

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      globalListeners.current.forEach((value, key) => {
        removeGlobalListener(value.eventTarget, value.type, key, value.options);
      });
    };
  }, [removeGlobalListener]);

  return { addGlobalListener, removeGlobalListener };
}
