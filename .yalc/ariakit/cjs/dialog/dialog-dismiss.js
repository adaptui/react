'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var dialogContext = require('../dialog-context-f7057db5.js');
var jsxRuntime = require('react/jsx-runtime');
var button_button = require('../button/button.js');

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
const useDialogDismiss = system.createHook(_ref => {
  var _state2;

  let {
    state,
    ...props
  } = _ref;
  const context = react.useContext(dialogContext.DialogContext);
  state = state || context;
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    var _state;

    onClickProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.hide();
  }, [onClickProp, (_state2 = state) == null ? void 0 : _state2.hide]);
  const children = react.useMemo(() => /*#__PURE__*/jsxRuntime.jsxs("svg", {
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
    children: [/*#__PURE__*/jsxRuntime.jsx("line", {
      x1: "4",
      y1: "4",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/jsxRuntime.jsx("line", {
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
  props = button_button.useButton(props);
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

const DialogDismiss = system.createComponent(props => {
  const htmlProps = useDialogDismiss(props);
  return system.createElement("button", htmlProps);
});

exports.DialogDismiss = DialogDismiss;
exports.useDialogDismiss = useDialogDismiss;
