import { FocusEvent as ReactFocusEvent, SyntheticEvent } from "react";
/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */
export declare function isPortalEvent(event: SyntheticEvent): boolean;
/**
 * Returns `true` if `event.target` and `event.currentTarget` are the same.
 */
export declare function isSelfTarget(event: SyntheticEvent | Event): boolean;
/**
 * Creates and dispatches an event.
 * @example
 * fireEvent(document.getElementById("id"), "blur", {
 *   bubbles: true,
 *   cancelable: true,
 * });
 */
export declare function fireEvent(element: Element, type: string, eventInit?: EventInit): boolean;
/**
 * Creates and dispatches a blur event.
 * @example
 * fireBlurEvent(document.getElementById("id"));
 */
export declare function fireBlurEvent(element: Element, eventInit?: FocusEventInit): boolean;
/**
 * Creates and dispatches a keyboard event.
 * @example
 * fireKeyboardEvent(document.getElementById("id"), "keydown", {
 *   key: "ArrowDown",
 *   shiftKey: true,
 * });
 */
export declare function fireKeyboardEvent(element: Element, type: string, eventInit?: KeyboardEventInit): boolean;
/**
 * Creates and dispatches a click event.
 * @example
 * fireClickEvent(document.getElementById("id"));
 */
export declare function fireClickEvent(element: Element, eventInit?: PointerEventInit): boolean;
/**
 * Checks whether the focus/blur event is happening from/to outside of the
 * container element.
 * @example
 * const element = document.getElementById("id");
 * element.addEventListener("blur", (event) => {
 *   if (isFocusEventOutside(event)) {
 *     // ...
 *   }
 * });
 */
export declare function isFocusEventOutside(event: ReactFocusEvent | FocusEvent, container?: Element | null): boolean;
/**
 * Runs a callback on the next animation frame, but before a certain event.
 */
export declare function queueBeforeEvent(element: Element, type: string, callback: () => void): number;
/**
 * Adds a global event listener, including on child frames.
 */
export declare function addGlobalEventListener<K extends keyof DocumentEventMap>(type: K, listener: (event: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions, scope?: Window): () => void;
export declare function addGlobalEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions, scope?: Window): () => void;
