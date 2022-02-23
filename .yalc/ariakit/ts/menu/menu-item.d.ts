import { MouseEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { CompositeHoverOptions } from "../composite/composite-hover";
import { CompositeItemOptions } from "../composite/composite-item";
import { MenuBarState } from "./menu-bar-state";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu item.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const undo = useMenuItem({ state });
 * const redo = useMenuItem({ state });
 * <MenuButton state={state}>Edit</MenuButton>
 * <Menu state={state}>
 *   <Role {...undo}>Undo</Role>
 *   <Role {...redo}>Redo</Role>
 * </Menu>
 * ```
 */
export declare const useMenuItem: import("ariakit-utils/types").Hook<MenuItemOptions<"div">>;
/**
 * A component that renders a menu item.
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
export declare const MenuItem: import("ariakit-utils/types").Component<MenuItemOptions<"div">>;
export declare type MenuItemOptions<T extends As = "div"> = Omit<CompositeItemOptions<T>, "state" | "preventScrollOnKeyDown"> & Omit<CompositeHoverOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuBarState` or `useMenuState` hooks. If not
     * provided, the parent `Menu` or `MenuBar` components' context will be
     * used.
     */
    state?: MenuBarState | MenuState;
    /**
     * Whether to hide the menu when the menu item is clicked.
     * @default true
     */
    hideOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
    /**
     * Whether the scroll behavior should be prevented when pressing arrow keys
     * on the first or the last items.
     * @default true
     */
    preventScrollOnKeyDown?: CompositeItemOptions["preventScrollOnKeyDown"];
};
export declare type MenuItemProps<T extends As = "div"> = Props<MenuItemOptions<T>>;
