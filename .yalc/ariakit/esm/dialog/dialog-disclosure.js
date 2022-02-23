import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDisclosure } from '../disclosure/disclosure.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that shows/hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialogDisclosure({ state });
 * <Role {...props}>Disclosure</Role>
 * <Dialog state={state}>Content</Dialog>
 * ```
 */
const useDialogDisclosure = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = useDisclosure({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a button that shows/hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <DialogDisclosure state={dialog}>Disclosure</DialogDisclosure>
 * <Dialog state={dialog}>Content</Dialog>
 * ```
 */

const DialogDisclosure = createComponent(props => {
  const htmlProps = useDialogDisclosure(props);
  return createElement("button", htmlProps);
});

export { DialogDisclosure, useDialogDisclosure };
