import { MenuBarState } from "./menu-bar-state";
import { MenuState } from "./menu-state";
declare type StateFilterFn<T> = (nextState: T) => unknown;
declare type StateFilter<T> = Array<StateFilterFn<T> | keyof NonNullable<T>>;
export declare const MenuBarContext: import("react").Context<MenuBarState | undefined>;
export declare const MenuContext: import("react").Context<MenuState<{
    [x: string]: string | number | boolean | (string | number)[];
}> | undefined>;
export declare const MenuItemCheckedContext: import("react").Context<boolean | undefined>;
export declare function useParentMenu(filter?: StateFilter<MenuState>): MenuState<{
    [x: string]: string | number | boolean | (string | number)[];
}> | undefined;
export {};
