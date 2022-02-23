import { As, Props } from "ariakit-utils/types";
import { CompositeTypeaheadOptions } from "../composite/composite-typeahead";
import { HovercardAnchorOptions } from "../hovercard/hovercard-anchor";
import { PopoverDisclosureOptions } from "../popover/popover-disclosure";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a menu button that triggers a dropdown menu.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const state = useMenuState();
 * const props = useMenuButton({ state });
 * <Role {...props}>Edit</Role>
 * <Menu state={state}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
export declare const useMenuButton: import("ariakit-utils/types").Hook<MenuButtonOptions<"button" | "div">>;
/**
 * A component that renders a menu button that triggers a dropdown menu.
 * Usually, this is rendered as a native `button` element, but if it's a submenu
 * button rendered as a menu item inside another menu, it'll be rendered as a
 * `div`.
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
export declare const MenuButton: import("ariakit-utils/types").Component<MenuButtonOptions<"button" | "div">>;
export declare type MenuButtonOptions<T extends As = "button" | "div"> = Omit<HovercardAnchorOptions<T>, "state"> & Omit<PopoverDisclosureOptions<T>, "state"> & Omit<CompositeTypeaheadOptions<T>, "state" | "typeahead"> & {
    /**
     * Object returned by the `useMenuState` hook.
     */
    state: MenuState;
    /**
     * Determines whether pressing a character key while focusing on the
     * `MenuButton` should move focus to the `MenuItem` starting with that
     * character. By default, it's `true` for menu buttons in a `MenuBar`, but
     * `false` for other menu buttons.
     */
    typeahead?: boolean;
};
export declare type MenuButtonProps<T extends As = "button" | "div"> = Props<MenuButtonOptions<T>>;
