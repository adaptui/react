import { As, Props } from "ariakit-utils/types";
import { FocusableOptions } from "../focusable/focusable";
import { CompositeState } from "./composite-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a composite widget.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const state = useCompositeState();
 * const props = useComposite({ state });
 * <Role {...props}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Role>
 * ```
 */
export declare const useComposite: import("ariakit-utils/types").Hook<CompositeOptions<"div">>;
/**
 * A component that renders a composite widget.
 * @see https://ariakit.org/components/composite
 * @example
 * ```jsx
 * const composite = useCompositeState();
 * <Composite state={composite}>
 *   <CompositeItem>Item 1</CompositeItem>
 *   <CompositeItem>Item 2</CompositeItem>
 * </Composite>
 * ```
 */
export declare const Composite: import("ariakit-utils/types").Component<CompositeOptions<"div">>;
export declare type CompositeOptions<T extends As = "div"> = FocusableOptions<T> & {
    /**
     * Object returned by the `useCompositeState` hook.
     */
    state: CompositeState;
    /**
     * Whether the component should behave as a composite widget. This prop should
     * be set to `false` when combining different composite widgets where only one
     * should behave as such.
     * @default true
     * @example
     * ```jsx
     * // Combining two composite widgets (combobox and menu), where only the
     * // Combobox component should behave as a composite widget.
     * const combobox = useComboboxState();
     * const menu = useMenuState(combobox);
     * <MenuButton state={menu}>Open Menu</MenuButton>
     * <Menu state={menu} composite={false}>
     *   <Combobox state={combobox} />
     *   <ComboboxList state={combobox}>
     *     <ComboboxItem as={MenuItem}>Item 1</ComboboxItem>
     *     <ComboboxItem as={MenuItem}>Item 2</ComboboxItem>
     *     <ComboboxItem as={MenuItem}>Item 3</ComboboxItem>
     *   </ComboboxList>
     * </Menu>
     * ```
     */
    composite?: boolean;
    /**
     * Whether the active composite item should receive focus when
     * `composite.move` is called.
     * @default true
     */
    focusOnMove?: boolean;
};
export declare type CompositeProps<T extends As = "div"> = Props<CompositeOptions<T>>;
