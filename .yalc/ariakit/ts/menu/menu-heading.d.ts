import { As, Props } from "ariakit-utils/types";
import { HovercardHeadingOptions } from "../hovercard/hovercard-heading";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a menu. This hook must be
 * used in a component that's wrapped with `Menu` so the `aria-labelledby` prop
 * is properly set on the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with Menu
 * const props = useMenuHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
export declare const useMenuHeading: import("ariakit-utils/types").Hook<MenuHeadingOptions<"h1">>;
/**
 * A component that renders a heading in a menu. This component must be wrapped
 * with `Menu` so the `aria-labelledby` prop is properly set on the menu
 * element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuHeading>Heading</MenuHeading>
 * </Menu>
 * ```
 */
export declare const MenuHeading: import("ariakit-utils/types").Component<MenuHeadingOptions<"h1">>;
export declare type MenuHeadingOptions<T extends As = "h1"> = Omit<HovercardHeadingOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `Menu` component's context will be used.
     */
    state?: MenuState;
};
export declare type MenuHeadingProps<T extends As = "h1"> = Props<MenuHeadingOptions<T>>;
