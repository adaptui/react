import { As, Props } from "ariakit-utils/types";
import { CheckboxOptions } from "../checkbox";
import { MenuItemOptions } from "./menu-item";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item checkbox inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState({ defaultValues: { apple: false } });
 * const props = useMenuItemCheckbox({ state, name: "apple" });
 * <MenuButton state={state}>Fruits</MenuButton>
 * <Menu state={state}>
 *   <Role {...props}>Apple</Role>
 * </Menu>
 * ```
 */
export declare const useMenuItemCheckbox: import("ariakit-utils/types").Hook<MenuItemCheckboxOptions<"div">>;
/**
 * A component that renders a menu item checkbox inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({ defaultValues: { apple: false } });
 * <MenuButton state={menu}>Fruits</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemCheckbox name="apple">Apple</MenuItemCheckbox>
 * </Menu>
 * ```
 */
export declare const MenuItemCheckbox: import("ariakit-utils/types").Component<MenuItemCheckboxOptions<"div">>;
export declare type MenuItemCheckboxOptions<T extends As = "div"> = Omit<MenuItemOptions<T>, "state" | "hideOnClick"> & Omit<CheckboxOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `Menu` component's context will be used.
     */
    state?: MenuState;
    /**
     * MenuItemCheckbox's name as in `menu.values`.
     */
    name: string;
    /**
     * Whether to hide the menu when the menu item checkbox is clicked.
     * @default false
     */
    hideOnClick?: MenuItemOptions<T>["hideOnClick"];
};
export declare type MenuItemCheckboxProps<T extends As = "div"> = Props<MenuItemCheckboxOptions<T>>;
