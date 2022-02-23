import { As, Props } from "ariakit-utils/types";
import { HovercardDescriptionOptions } from "../hovercard/hovercard-description";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a menu. This hook must
 * be used in a component that's wrapped with `Menu` so the `aria-describedby`
 * prop is properly set on the menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with Menu
 * const props = useMenuDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
export declare const useMenuDescription: import("ariakit-utils/types").Hook<MenuDescriptionOptions<"p">>;
/**
 * A component that renders a description in a menu. This component must be
 * wrapped with `Menu` so the `aria-describedby` prop is properly set on the
 * menu element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState();
 * <Menu state={menu}>
 *   <MenuDescription>Description</MenuDescription>
 * </Menu>
 * ```
 */
export declare const MenuDescription: import("ariakit-utils/types").Component<MenuDescriptionOptions<"p">>;
export declare type MenuDescriptionOptions<T extends As = "p"> = Omit<HovercardDescriptionOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook. If not provided, the parent
     * `Menu` component's context will be used.
     */
    state?: MenuState;
};
export declare type MenuDescriptionProps<T extends As = "p"> = Props<MenuDescriptionOptions<T>>;
