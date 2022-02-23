'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('ariakit-utils/system');
var disclosure_disclosure = require('../disclosure/disclosure.js');

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
const useDialogDisclosure = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = disclosure_disclosure.useDisclosure({
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

const DialogDisclosure = system.createComponent(props => {
  const htmlProps = useDialogDisclosure(props);
  return system.createElement("button", htmlProps);
});

exports.DialogDisclosure = DialogDisclosure;
exports.useDialogDisclosure = useDialogDisclosure;
