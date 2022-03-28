import { As, Props } from "ariakit-utils/types";
import { CheckboxCheckOptions } from "../checkbox/checkbox-check";
import { MenuState } from "./menu-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a checkmark inside a `MenuItemCheckbox` or
 * `MenuItemRadio` components. This hook must be used in a component that's
 * wrapped with one of those components or the `checked` prop must be explicitly
 * passed to the component.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const props = useMenuItemCheck({ checked: true });
 * <Role {...props} />
 * ```
 */
export declare const useMenuItemCheck: import("ariakit-utils/types").Hook<MenuItemCheckOptions<"span">>;
/**
 * A component that renders a checkmark inside a `MenuItemCheckbox` or
 * `MenuItemRadio` components. This component must be wrapped with one of those
 * components or the `checked` prop must be explicitly passed to the component.
 * @see https://ariakit.org/components/menu
 * @example
 * ```jsx
 * const menu = useMenuState({
 *   defaultValues: { apple: true, orange: false },
 * });
 * <MenuButton state={menu}>Fruits</MenuButton>
 * <Menu state={menu}>
 *   <MenuItemCheckbox name="apple">
 *     <MenuItemCheck />
 *     Apple
 *   </MenuItemCheckbox>
 *   <MenuItemCheckbox name="orange">
 *     <MenuItemCheck />
 *     Orange
 *   </MenuItemCheckbox>
 * </Menu>
 * ```
 */
export declare const MenuItemCheck: import("ariakit-utils/types").Component<MenuItemCheckOptions<"span">>;
export declare type MenuItemCheckOptions<T extends As = "span"> = Omit<CheckboxCheckOptions<T>, "state"> & {
    /**
     * Object returned by the `useMenuState` hook.
     */
    state?: MenuState;
};
export declare type MenuItemCheckProps<T extends As = "span"> = Props<MenuItemCheckOptions<T>>;