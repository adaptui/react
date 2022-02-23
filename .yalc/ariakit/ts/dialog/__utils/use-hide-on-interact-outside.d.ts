import { RefObject } from "react";
import { DialogOptions } from "../dialog";
declare type Options = Pick<DialogOptions, "state" | "modal" | "hideOnInteractOutside"> & {
    enabled?: boolean;
};
export declare function useHideOnInteractOutside(dialogRef: RefObject<HTMLElement>, nestedDialogs: Array<RefObject<HTMLElement>>, { state, modal, hideOnInteractOutside, enabled }: Options): void;
export {};
