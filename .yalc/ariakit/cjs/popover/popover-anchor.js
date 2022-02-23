'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that will serve as the popover's
 * anchor. The popover will be positioned relative to this element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverAnchor({ state });
 * <Role {...props}>Anchor</Role>
 * <Popover state={state}>Popover</Popover>
 * ```
 */
const usePopoverAnchor = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = { ...props,
    ref: hooks.useForkRef(state.anchorRef, props.ref)
  };
  return props;
});
/**
 * A component that renders an element that will serve as the popover's anchor.
 * The popover will be positioned relative to this element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverAnchor state={popover}>Anchor</PopoverAnchor>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */

const PopoverAnchor = system.createComponent(props => {
  const htmlProps = usePopoverAnchor(props);
  return system.createElement("div", htmlProps);
});

exports.PopoverAnchor = PopoverAnchor;
exports.usePopoverAnchor = usePopoverAnchor;
