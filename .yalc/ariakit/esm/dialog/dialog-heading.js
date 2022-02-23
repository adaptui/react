import { useContext } from 'react';
import { useId, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { a as DialogHeadingContext } from '../dialog-context-f963dd70.js';
import { useHeading } from '../heading/heading.js';

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
const useDialogHeading = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const setHeadingId = useContext(DialogHeadingContext);
  const id = useId(props.id);
  useSafeLayoutEffect(() => {
    setHeadingId == null ? void 0 : setHeadingId(id);
    return () => setHeadingId == null ? void 0 : setHeadingId(undefined);
  }, [setHeadingId, id]);
  props = {
    id,
    ...props
  };
  props = useHeading(props);
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

const DialogHeading = createComponent(props => {
  const htmlProps = useDialogHeading(props);
  return createElement("h1", htmlProps);
});

export { DialogHeading, useDialogHeading };
