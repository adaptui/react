import { DialogProps } from "../dialog";
declare type DialogBackdropProps = Pick<DialogProps, "state" | "backdrop" | "backdropProps" | "children" | "hideOnInteractOutside" | "hideOnEscape">;
export declare function DialogBackdrop({ state, backdrop, backdropProps, hideOnInteractOutside, hideOnEscape, children, }: DialogBackdropProps): JSX.Element;
export {};
