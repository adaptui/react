import { MouseEvent } from "react";
import { As, BooleanOrCallback, Props } from "ariakit-utils/types";
import { ButtonOptions } from "../button/button";
import { DisclosureState } from "./disclosure-state";
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that controls the visibility of a
 * disclosure content element.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const state = useDisclosureState();
 * const props = useDisclosure({ state });
 * <Role {...props}>Disclosure</Role>
 * <DisclosureContent state={state}>Content</DisclosureContent>
 * ```
 */
export declare const useDisclosure: import("ariakit-utils/types").Hook<DisclosureOptions<"button">>;
/**
 * A component that renders an element that controls the visibility of a
 * disclosure content element.
 * @see https://ariakit.org/components/disclosure
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */
export declare const Disclosure: import("ariakit-utils/types").Component<DisclosureOptions<"button">>;
export declare type DisclosureOptions<T extends As = "button"> = ButtonOptions<T> & {
    /**
     * Object returned by the `useDisclosureState` hook.
     */
    state: DisclosureState;
    /**
     * Determines whether `state.toggle()` will be called on click. This is useful
     * if you want to handle the toggle logic yourself.
     * @default true
     */
    toggleOnClick?: BooleanOrCallback<MouseEvent<HTMLElement>>;
};
export declare type DisclosureProps<T extends As = "button"> = Props<DisclosureOptions<T>>;
