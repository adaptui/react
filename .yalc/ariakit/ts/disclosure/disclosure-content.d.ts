import { As, Options, Props } from "ariakit-utils/types";
import { DisclosureState } from "./disclosure-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that can be shown or hidden.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const state = useDisclosureState();
 * const props = useDisclosureContent({ state });
 * <Disclosure state={state}>Disclosure</Disclosure>
 * <Role {...props}>Content</Role>
 * ```
 */
export declare const useDisclosureContent: import("ariakit-utils/types").Hook<DisclosureContentOptions<"div">>;
/**
 * A component that renders an element that can be shown or hidden.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */
export declare const DisclosureContent: import("ariakit-utils/types").Component<DisclosureContentOptions<"div">>;
export declare type DisclosureContentOptions<T extends As = "div"> = Options<T> & {
    /**
     * Object returned by the `useDisclosureState` hook.
     */
    state: DisclosureState;
};
export declare type DisclosureContentProps<T extends As = "div"> = Props<DisclosureContentOptions<T>>;
