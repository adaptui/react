'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var dialogContext = require('../dialog-context-f7057db5.js');

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
const useDialogDescription = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const setDescriptionId = react.useContext(dialogContext.DialogDescriptionContext);
  const id = hooks.useId(props.id);
  hooks.useSafeLayoutEffect(() => {
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

const DialogDescription = system.createComponent(props => {
  const htmlProps = useDialogDescription(props);
  return system.createElement("p", htmlProps);
});

exports.DialogDescription = DialogDescription;
exports.useDialogDescription = useDialogDescription;
