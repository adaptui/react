import { As, Props } from "ariakit-utils/types";
import { CompositeGroupOptions } from "../composite/composite-group";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu group.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuGroup({ state });
 * <MenuButton state={state}>Recent Items</MenuButton>
 * <Menu state={state}>
 *   <Role {...props}>
 *     <MenuGroupLabel>Applications</MenuGroupLabel>
 *     <MenuItem>Google Chrome.app</MenuItem>
 *     <MenuItem>Safari.app</MenuItem>
 *   </Role>
 * </Menu>
 * ```
 */
export declare const useMenuGroup: import("ariakit-utils/types").Hook<MenuGroupOptions<"div">>;
/**
 * A component that renders a menu group.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Recent Items</MenuButton>
 * <Menu state={menu}>
 *   <MenuGroup>
 *     <MenuGroupLabel>Applications</MenuGroupLabel>
 *     <MenuItem>Google Chrome.app</MenuItem>
 *     <MenuItem>Safari.app</MenuItem>
 *   </MenuGroup>
 * </Menu>
 * ```
 */
export declare const MenuGroup: import("ariakit-utils/types").Component<MenuGroupOptions<"div">>;
export declare type MenuGroupOptions<T extends As = "div"> = Omit<CompositeGroupOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook.
     */
    state?: MenuState;
};
export declare type MenuGroupProps<T extends As = "div"> = Props<MenuGroupOptions<T>>;