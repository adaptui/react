import { RefObject } from "react";
import { DialogState } from "../dialog-state";
/**
 * When the focused child gets removed from the DOM, we make sure to move focus
 * to the dialog.
 */
export declare function useFocusOnChildUnmount(dialogRef: RefObject<HTMLElement>, state: DialogState): void;
