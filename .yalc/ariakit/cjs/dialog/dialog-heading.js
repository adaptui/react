'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var dialogContext = require('../dialog-context-f7057db5.js');
var heading_heading = require('../heading/heading.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a heading element for a dialog. This hook must be
 * used in a component that's wrapped with `Dialog` so the `aria-labelledby`
 * prop is properly set on the dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * // This component must be wrapped with Dialog
 * const props = useDialogHeading();
 * <Role {...props}>Heading</Role>
 * ```
 */
const useDialogHeading = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const setHeadingId = react.useContext(dialogContext.DialogHeadingContext);
  const id = hooks.useId(props.id);
  hooks.useSafeLayoutEffect(() => {
    setHeadingId == null ? void 0 : setHeadingId(id);
    return () => setHeadingId == null ? void 0 : setHeadingId(undefined);
  }, [setHeadingId, id]);
  props = {
    id,
    ...props
  };
  props = heading_heading.useHeading(props);
  return props;
});
/**
 * A component that renders a heading in a dialog. This component must be
 * wrapped with `Dialog` so the `aria-labelledby` prop is properly set on the
 * dialog element.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogHeading>Heading</DialogHeading>
 * </Dialog>
 * ```
 */

const DialogHeading = system.createComponent(props => {
  const htmlProps = useDialogHeading(props);
  return system.createElement("h1", htmlProps);
});

exports.DialogHeading = DialogHeading;
exports.useDialogHeading = useDialogHeading;
