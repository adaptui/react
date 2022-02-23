import { As, Props } from "ariakit-utils/types";
import { HovercardOptions } from "../hovercard/hovercard";
import { MenuListOptions } from "./menu-list";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a dropdown menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenu({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Role {...props}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Role>
 * ```
 */
export declare const useMenu: import("ariakit-utils/types").Hook<MenuOptions<"div">>;
/**
 * A component that renders a dropdown menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
export declare const Menu: import("ariakit-utils/types").Component<MenuOptions<"div">>;
export declare type MenuOptions<T extends As = "div"> = MenuListOptions<T> & Omit<HovercardOptions<T>, "state">;
export declare type MenuProps<T extends As = "div"> = Props<MenuOptions<T>>;
