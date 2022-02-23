import { useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';

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
const usePopoverAnchor = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  props = { ...props,
    ref: useForkRef(state.anchorRef, props.ref)
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

const PopoverAnchor = createComponent(props => {
  const htmlProps = usePopoverAnchor(props);
  return createElement("div", htmlProps);
});

export { PopoverAnchor, usePopoverAnchor };
