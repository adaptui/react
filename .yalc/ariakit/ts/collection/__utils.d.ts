import { RefObject } from "react";
export declare type Item = {
    ref: RefObject<HTMLElement>;
};
export declare const CollectionItemContext: import("react").Context<((item: Item) => () => void) | undefined>;
