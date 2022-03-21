import { CompositeState } from "../composite/composite-state";
import { SelectState } from "./select-state";
export declare type Item = CompositeState["items"][number] & {
    value?: string;
};
export declare const SelectItemCheckedContext: import("react").Context<boolean>;
export declare const SelectContext: import("react").Context<SelectState<string | string[]> | undefined>;
export declare function findFirstEnabledItemWithValue(items: Item[]): Item | undefined;
export declare function findEnabledItemWithValueById(items: Item[], id: string): Item | undefined;
export declare function findEnabledItemByValue(items: Item[], value: string): Item | undefined;
