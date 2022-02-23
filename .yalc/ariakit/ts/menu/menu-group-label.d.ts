import { As, Props } from "ariakit-utils/types";
import { CompositeGroupLabelOptions } from "../composite/composite-group-label";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a menu group. This hook must be used
 * in a component that's wrapped with `MenuGroup` so the `aria-labelledby`
 * prop is properly set on the menu group element.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * // This component must be wrapped with MenuGroup
 * const props = useMenuGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */
export declare const useMenuGroupLabel: import("ariakit-utils/types").Hook<MenuGroupLabelOptions<"div">>;
/**
 * A component that renders a label in a menu group. This component must be
 * wrapped with `MenuGroup` so the `aria-labelledby` prop is properly set
 * on the menu group element.
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
export declare const MenuGroupLabel: import("ariakit-utils/types").Component<MenuGroupLabelOptions<"div">>;
export declare type MenuGroupLabelOptions<T extends As = "div"> = Omit<CompositeGroupLabelOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook.
     */
    state?: MenuState;
};
export declare type MenuGroupLabelProps<T extends As = "div"> = Props<MenuGroupLabelOptions<T>>;
