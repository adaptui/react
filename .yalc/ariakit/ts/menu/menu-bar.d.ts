import { As, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { MenuBarState } from "./menu-bar-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu bar that may contain a group of menu items
 * that control other submenus.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuBarState();
 * const menuBarProps = useMenuBar({ state });
 * const fileProps = useMenuItem({ state });
 * const fileMenu = useMenuState();
 * <Role {...menuBarProps}>
 *   <MenuButton {...fileProps} state={fileMenu}>
 *     File
 *   </MenuButton>
 *   <Menu state={fileMenu}>
 *     <MenuItem>New File</MenuItem>
 *     <MenuItem>New Window</MenuItem>
 *   </Menu>
 * </Role>
 * ```
 */
export declare const useMenuBar: import("ariakit-utils/types").Hook<MenuBarOptions<"div">>;
/**
 * A component that renders a menu bar that may contain a group of menu items
 * that control other submenus.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuBarState();
 * const fileProps = useMenuItem({ state });
 * const editProps = useMenuItem({ state });
 * const fileMenu = useMenuState();
 * const editMenu = useMenuState();
 * <MenuBar state={state}>
 *   <MenuButton {...fileProps} state={fileMenu}>
 *     File
 *   </MenuButton>
 *   <Menu state={fileMenu}>
 *     <MenuItem>New File</MenuItem>
 *     <MenuItem>New Window</MenuItem>
 *   </Menu>
 *   <MenuButton {...editProps} state={editMenu}>
 *     Edit
 *   </MenuButton>
 *   <Menu state={editMenu}>
 *     <MenuItem>Undo</MenuItem>
 *     <MenuItem>Redo</MenuItem>
 *   </Menu>
 * </MenuBar>
 * ```
 */
export declare const MenuBar: import("ariakit-utils/types").Component<MenuBarOptions<"div">>;
export declare type MenuBarOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuBarState` hook.
     */
    state: MenuBarState;
};
export declare type MenuBarProps<T extends As = "div"> = Props<MenuBarOptions<T>>;
