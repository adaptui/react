import { DisclosureState, DisclosureStateProps } from "../disclosure/disclosure-state";
/**
 * Provides state for the `Dialog` components.
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <button onClick={dialog.toggle}>Open dialog</button>
 * <Dialog state={dialog}>Content</Dialog>
 * ```
 */
export declare function useDialogState(props?: DialogStateProps): DialogState;
export declare type DialogState = DisclosureState;
export declare type DialogStateProps = DisclosureStateProps;
