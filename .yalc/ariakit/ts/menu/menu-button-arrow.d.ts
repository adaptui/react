import { As, Props } from "ariakit-utils/types";
import { PopoverDisclosureArrowOptions } from "../popover/popover-disclosure-arrow";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow pointing to the menu position, usually
 * inside a `MenuButton`.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuButtonArrow({ state });
 * <MenuButton state={state}>
 *   Edit
 *   <Role {...props} />
 * </MenuButton>
 * <Menu state={state}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
export declare const useMenuButtonArrow: import("ariakit-utils/types").Hook<MenuButtonArrowOptions<"span">>;
/**
 * A component that renders an arrow pointing to the menu position, usually
 * inside a `MenuButton`.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <MenuButton state={menu}>
 *   Edit
 *   <MenuButtonArrow />
 * </MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
export declare const MenuButtonArrow: import("ariakit-utils/types").Component<MenuButtonArrowOptions<"span">>;
export declare type MenuButtonArrowOptions<T extends As = "span"> = Omit<PopoverDisclosureArrowOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `MenuButton` component's context will be used.
     */
    state?: MenuState;
};
export declare type MenuButtonArrowProps<T extends As = "span"> = Props<MenuButtonArrowOptions<T>>;
