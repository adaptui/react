import { As, Props } from "ariakit-utils/types";
import { DialogDisclosureOptions } from "../dialog/dialog-disclosure";
import { HovercardState } from "./hovercard-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a hidden disclosure button that will be visible
 * when the hovercard anchor element (`HovercardAnchor`) receives keyboard
 * focus. The user can then navigate to the button to open the hovercard when
 * using the keyboard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const state = useHovercardState();
 * const props = useHovercardDisclosure({ state });
 * <HovercardAnchor state={state}>@username</HovercardAnchor>
 * <Role {...props} />
 * <Hovercard state={state}>Details</Hovercard>
 * ```
 */
export declare const useHovercardDisclosure: import("ariakit-utils/types").Hook<HovercardDisclosureOptions<"button">>;
/**
 * A component that renders a hidden disclosure button that will be visible when
 * the hovercard anchor element (`HovercardAnchor`) receives keyboard focus. The
 * user can then navigate to the button to open the hovercard when using the
 * keyboard.
 * @see https://ariakit.org/components/hovercard
 * @example
 * ```jsx
 * const hovercard = useHovercardState();
 * <HovercardAnchor state={hovercard}>@username</HovercardAnchor>
 * <HovercardDisclosure state={hovercard} />
 * <Hovercard state={hovercard}>Details</Hovercard>
 * ```
 */
export declare const HovercardDisclosure: import("ariakit-utils/types").Component<HovercardDisclosureOptions<"button">>;
export declare type HovercardDisclosureOptions<T extends As = "button"> = Omit<DialogDisclosureOptions<T>, "state"> & {
    /**
     * Object returned by the `useHovercardState` hook.
     */
    state: HovercardState;
};
export declare type HovercardDisclosureProps<T extends As = "button"> = Props<HovercardDisclosureOptions<T>>;
