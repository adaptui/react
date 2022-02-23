import { useContext, useCallback, useMemo } from 'react';
import { useEventCallback } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { D as DialogContext } from '../dialog-context-f963dd70.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useButton } from '../button/button.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const state = useDialogState();
 * const props = useDialogDismiss({ state });
 * <Dialog state={state}>
 *   <Role {...props} />
 * </Dialog>
 * ```
 */
const useDialogDismiss = createHook(_ref => {
  var _state2;

  let {
    state,
    ...props
  } = _ref;
  const context = useContext(DialogContext);
  state = state || context;
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    var _state;

    onClickProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.hide();
  }, [onClickProp, (_state2 = state) == null ? void 0 : _state2.hide]);
  const children = useMemo(() => /*#__PURE__*/jsxs("svg", {
    "aria-label": "Dismiss popup",
    display: "block",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5pt",
    viewBox: "0 0 16 16",
    height: "1em",
    width: "1em",
    children: [/*#__PURE__*/jsx("line", {
      x1: "4",
      y1: "4",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/jsx("line", {
      x1: "4",
      y1: "12",
      x2: "12",
      y2: "4"
    })]
  }), []);
  props = {
    "data-dialog-dismiss": "",
    children,
    ...props,
    onClick
  };
  props = useButton(props);
  return props;
});
/**
 * A component that renders a button that hides a dialog.
 * @see https://ariakit.org/components/dialog
 * @example
 * ```jsx
 * const dialog = useDialogState();
 * <Dialog state={dialog}>
 *   <DialogDismiss />
 * </Dialog>
 * ```
 */

const DialogDismiss = createComponent(props => {
  const htmlProps = useDialogDismiss(props);
  return createElement("button", htmlProps);
});

export { DialogDismiss, useDialogDismiss };
