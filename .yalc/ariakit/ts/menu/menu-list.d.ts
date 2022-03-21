import { As, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { CompositeTypeaheadOptions } from "../composite/composite-typeahead";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu list element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuList({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Role {...props}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Role>
 * ```
 */
export declare const useMenuList: import("ariakit-utils/types").Hook<MenuListOptions<"div">>;
/**
 * A component that renders a menu list element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>Edit</MenuButton>
 * <MenuList state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </MenuList>
 * ```
 */
export declare const MenuList: import("ariakit-utils/types").Component<MenuListOptions<"div">>;
export declare type MenuListOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & Omit<CompositeTypeaheadOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuListState` hook.
     */
    state: MenuState;
};
export declare type MenuListProps<T extends As = "div"> = Props<MenuListOptions<T>>;
