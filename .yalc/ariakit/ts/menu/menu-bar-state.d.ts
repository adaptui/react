import { CompositeState, CompositeStateProps } from "../composite/composite-state";
/**
 * Provides state for the `MenuBar` component.
 * @example
 * ```jsx
 * const menu = useMenuBarState();
 * <MenuBar state={menu} />
 * ```
 */
export declare function useMenuBarState({ orientation, focusLoop, ...props }?: MenuBarStateProps): MenuBarState;
export declare type MenuBarState = CompositeState;
export declare type MenuBarStateProps = CompositeStateProps;
