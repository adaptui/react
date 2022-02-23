'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var dialog_dialogDisclosure = require('../dialog/dialog-disclosure.js');
var __utils = require('../__utils-bb7fa552.js');
var popover_popoverAnchor = require('./popover-anchor.js');
var jsxRuntime = require('react/jsx-runtime');

const usePopoverDisclosure = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    state.anchorRef.current = event.currentTarget;
    state.setAnchorRect(null);
    onClickProp(event);
  }, [state.anchorRef, state.setAnchorRect, onClickProp]);
  props = hooks.useWrapElement(props, element => /*#__PURE__*/jsxRuntime.jsx(__utils.PopoverContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = { ...props,
    onClick
  };
  props = popover_popoverAnchor.usePopoverAnchor({
    state,
    ...props
  });
  props = dialog_dialogDisclosure.useDialogDisclosure({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a button that controls the visibility of the popover
 * when clicked.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */

const PopoverDisclosure = system.createComponent(props => {
  const htmlProps = usePopoverDisclosure(props);
  return system.createElement("button", htmlProps);
});

exports.PopoverDisclosure = PopoverDisclosure;
exports.usePopoverDisclosure = usePopoverDisclosure;
