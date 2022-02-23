import { As, Props } from "ariakit-utils/types";
import { RadioOptions } from "../radio/radio";
import { MenuItemOptions } from "./menu-item";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item radio inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState({ defaultValues: { fruit: "apple" } });
 * const apple = useMenuItemRadio({ state, name: "fruit", value: "apple" });
 * const orange = useMenuItemRadio({ state, name: "fruit", value: "orange" });
 * <MenuButton state={state}>Fruit</MenuButton>
 * <Menu state={state}>
 *   <Role {...apple}>Apple</Role>
 *   <Role {...orange}>Orange</Role>
 * </Menu>
 * ```
 */
export declare const useMenuItemRadio: import("ariakit-utils/types").Hook<MenuItemRadioOptions<"div">>;
/**
 * A component that renders a menu item radio inside a menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({ defaultValues: { fruit: "apple" } });
 * <MenuButton state={menu}>Fruit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemRadio name="fruit" value="apple">
 *     Apple
 *   </MenuItemRadio>
 *   <MenuItemRadio name="fruit" value="orange">
 *     Orange
 *   </MenuItemRadio>
 * </Menu>
 * ```
 */
export declare const MenuItemRadio: import("ariakit-utils/types").Component<MenuItemRadioOptions<"div">>;
export declare type MenuItemRadioOptions<T extends As = "div"> = Omit<MenuItemOptions<T>, "hideOnClick"> & Omit<RadioOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `Menu` component's context will be used.
     */
    state?: MenuState;
    /**
     * MenuItemRadio's name as in `menu.values`.
     */
    name: string;
    /**
     * Whether to hide the menu when the menu item radio is clicked.
     * @default false
     */
    hideOnClick?: MenuItemOptions<T>["hideOnClick"];
};
export declare type MenuItemRadioProps<T extends As = "div"> = Props<MenuItemRadioOptions<T>>;
