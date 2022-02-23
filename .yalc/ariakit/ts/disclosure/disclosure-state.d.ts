import { MutableRefObject } from "react";
import { SetState } from "ariakit-utils/types";
/**
 * Provides state for the `Disclosure` components.
 * @example
 * ```jsx
 * const disclosure = useDisclosureState();
 * <Disclosure state={disclosure}>Disclosure</Disclosure>
 * <DisclosureContent state={disclosure}>Content</DisclosureContent>
 * ```
 */
export declare function useDisclosureState({ animated, ...props }?: DisclosureStateProps): DisclosureState;
export declare type DisclosureState = {
    /**
     * The disclosure element ref.
     */
    disclosureRef: MutableRefObject<HTMLElement | null>;
    /**
     * The visibility state of the content.
     * @default false
     */
    visible: boolean;
    /**
     * The mounted state of the content. If `animated` is `false` or not defined,
     * this will be the same as `visible`. Otherwise, it will wait for the
     * animation to complete before becoming `false` so the content is not
     * unmounted while animating.
     * @example
     * ```jsx
     * const disclosure = useDisclosureState({ animated: 500 });
     * <Disclosure state={disclosure} />
     * {disclosure.mounted && <DisclosureContent state={disclosure} />}
     * ```
     */
    mounted: boolean;
    /**
     * Determines whether the content should animate when it is shown or hidden.
     *   - If `true`, the `animating` state will be `true` when the content is
     *     shown or hidden and it will wait for `stopAnimation` to be called or a
     *     CSS animation/transition to end before becoming `false`.
     *   - If it's set to a number, the `animating` state will be `true` when the
     *     content is shown or hidden and it will wait for the number of
     *     milliseconds to pass before becoming `false`.
     * @default false
     */
    animated: boolean | number;
    /**
     * Whether the content is currently animating.
     */
    animating: boolean;
    /**
     * The content element that is being shown or hidden.
     */
    contentElement: HTMLElement | null;
    /**
     * Sets the `contentElement` state.
     */
    setContentElement: SetState<DisclosureState["contentElement"]>;
    /**
     * Sets the `visible` state.
     */
    setVisible: SetState<DisclosureState["visible"]>;
    /**
     * Sets the `visible` state to `true`.
     */
    show: () => void;
    /**
     * Sets the `visible` state to `false`.
     */
    hide: () => void;
    /**
     * Sets the `visible` state to the opposite of the current value.
     */
    toggle: () => void;
    /**
     * Stops the animation.
     */
    stopAnimation: () => void;
};
export declare type DisclosureStateProps = Partial<Pick<DisclosureState, "visible" | "animated">> & {
    /**
     * The default visibility state of the content.
     * @default false
     */
    defaultVisible?: DisclosureState["visible"];
    /**
     * Function that will be called when setting the disclosure `visible` state.
     * @example
     * // Uncontrolled example
     * useDisclosureState({ setVisible: (visible) => console.log(visible) });
     * @example
     * // Controlled example
     * const [visible, setVisible] = useState(false);
     * useDisclosureState({ visible, setVisible });
     * @example
     * // Externally controlled example
     * function MyDisclosure({ visible, onVisibleChange }) {
     *   const disclosure = useDisclosureState({
     *     visible,
     *     setVisible: onVisibleChange,
     *   });
     * }
     */
    setVisible?: (visible: DisclosureState["visible"]) => void;
};
