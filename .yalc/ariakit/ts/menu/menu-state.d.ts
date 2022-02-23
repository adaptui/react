import { SetState, SetStateAction } from "ariakit-utils/types";
import { CompositeState, CompositeStateProps } from "../composite/composite-state";
import { HovercardState, HovercardStateProps } from "../hovercard/hovercard-state";
declare type Values = Record<string, string | boolean | number | Array<string | number>>;
/**
 * Provides state for the `Menu` components.
 * @example
 * ```jsx
 * const menu = useMenuState({ placement: "top" });
 * <MenuButton state={menu}>Edit</MenuButton>
 * <Menu state={menu}>
 *   <MenuItem>Undo</MenuItem>
 *   <MenuItem>Redo</MenuItem>
 * </Menu>
 * ```
 */
export declare function useMenuState<V extends Values = Values>({ orientation, timeout, hideTimeout, ...props }?: MenuStateProps<V>): MenuState<V>;
export declare type MenuState<V extends Values = Values> = CompositeState & HovercardState & {
    /**
     * Determines the element that should be focused when the menu is opened.
     */
    initialFocus: "container" | "first" | "last";
    /**
     * Sets the `initialFocus` state.
     */
    setInitialFocus: SetState<MenuState["initialFocus"]>;
    /**
     * A map of names and values that will be used by the `MenuItemCheckbox` and
     * `MenuItemRadio` components.
     */
    values: V;
    /**
     * Sets the `values` state.
     */
    setValues: SetState<MenuState<V>["values"]>;
    /**
     * Sets a specific value.
     */
    setValue: (name: string, value: SetStateAction<MenuState<V>["values"][string]>) => void;
    /**
     * Hides the menu and all the parent menus.
     */
    hideAll: () => void;
};
export declare type MenuStateProps<V extends Values = Values> = CompositeStateProps & HovercardStateProps & Partial<Pick<MenuState<V>, "values">> & {
    /**
     * A default map of names and values that will be used by the
     * `MenuItemCheckbox` and `MenuItemRadio` components.
     */
    defaultValues?: MenuState<V>["values"];
    /**
     * Function that will be called when setting the menu `values` state.
     * @example
     * const [values, setValues] = useState({});
     * // Combining the values from two menus into a single state.
     * const menu = useMenuState({ values, setValues });
     * const submenu = useMenuState({ values, setValues });
     */
    setValues?: (values: MenuState<V>["values"]) => void;
};
export {};
