import { As, Options, Props } from "ariakit-utils/types";
import { CheckboxState } from "./checkbox-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a check mark icon.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * const props = useCheckboxCheck({ checked: true });
 * <Role {...props} />
 * ```
 */
export declare const useCheckboxCheck: import("ariakit-utils/types").Hook<CheckboxCheckOptions<"span">>;
/**
 * A component that renders a a check mark icon.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * <CheckboxCheck checked />
 * ```
 */
export declare const CheckboxCheck: import("ariakit-utils/types").Component<CheckboxCheckOptions<"span">>;
export declare type CheckboxCheckOptions<T extends As = "span"> = Options<T> & {
    /**
     * Object returned by the `useCheckboxState` hook. If not provided, the parent
     * `Checkbox` component's context will be used. If the `checked` prop is
     * provided, it will override this state.
     */
    state?: CheckboxState;
    /**
     * Whether the check mark should be shown. This value is automatically
     * inferred from the `state` prop or the parent `Checkbox` component. Manually
     * setting this prop will override the inferred value.
     */
    checked?: boolean;
};
export declare type CheckboxCheckProps<T extends As = "span"> = Props<CheckboxCheckOptions<T>>;
