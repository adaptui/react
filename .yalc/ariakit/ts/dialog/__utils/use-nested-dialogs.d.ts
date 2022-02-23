import { RefObject } from "react";
import { WrapElement } from "ariakit-utils/types";
import { DialogOptions } from "../dialog";
declare type DialogRef = RefObject<HTMLElement>;
/**
 * Handles nested dialogs.
 */
export declare function useNestedDialogs(dialogRef: DialogRef, { state, modal }: Pick<DialogOptions, "state" | "modal">): {
    nestedDialogs: DialogRef[];
    visibleModals: DialogRef[];
    wrapElement: WrapElement;
};
export {};
