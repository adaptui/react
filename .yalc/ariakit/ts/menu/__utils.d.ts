import { MenuBarState } from "./menu-bar-state";
import { MenuState } from "./menu-state";
export declare const MenuBarContext: import("react").Context<MenuBarState | undefined>;
export declare const MenuContext: import("react").Context<MenuState<{
    [x: string]: string | number | boolean | (string | number)[];
}> | undefined>;
export declare const MenuItemCheckedContext: import("react").Context<boolean | undefined>;
export declare function hasExpandedMenuButton(items?: MenuState["items"], currentElement?: Element): boolean;
