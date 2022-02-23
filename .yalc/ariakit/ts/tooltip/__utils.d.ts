import { RefObject } from "react";
import { TooltipState } from "./tooltip-state";
export declare function createGlobalTooltipState(): {
    activeRef: RefObject<any> | null;
    listeners: Set<(ref: RefObject<any> | null) => void>;
    subscribe(listener: (ref: RefObject<any> | null) => void): () => void;
    show(ref: RefObject<any> | null): void;
    hide(ref: RefObject<any>): void;
};
export declare const TooltipContext: import("react").Context<TooltipState | undefined>;
