import { useContext } from 'react';
import { useId, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { b as DialogDescriptionContext } from '../dialog-context-f963dd70.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a description element for a dialog. This hook
 * must be used in a component that's wrapped with `Dialog` so the
 * `aria-describedby` prop is properly set on the dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * // This component must be wrapped with Dialog
 * const props = useDialogDescription();
 * <Role {...props}>Description</Role>
 * ```
 */
const useDialogDescription = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const setDescriptionId = useContext(DialogDescriptionContext);
  const id = useId(props.id);
  useSafeLayoutEffect(() => {
    setDescriptionId == null ? void 0 : setDescriptionId(id);
    return () => setDescriptionId == null ? void 0 : setDescriptionId(undefined);
  }, [setDescriptionId, id]);
  props = {
    id,
    ...props
  };
  return props;
});
/**
 * A component that renders a description in a dialog. This component must be
 * wrapped with `Dialog` so the `aria-describedby` prop is properly set on the
 * dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogDescription>Description</DialogDescription>
 * </Dialog>
 * ```
 */

const DialogDescription = createComponent(props => {
  const htmlProps = useDialogDescription(props);
  return createElement("p", htmlProps);
});

export { DialogDescription, useDialogDescription };
