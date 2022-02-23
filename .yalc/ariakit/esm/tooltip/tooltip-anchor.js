import { useCallback } from 'react';
import { useEventCallback } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { usePopoverAnchor } from '../popover/popover-anchor.js';

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an element that will be labelled or described by
 * a `Tooltip` component. This component will also be used as the reference to
 * position the tooltip on the screen.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const state = useToolTipState();
 * const props = useTooltipAnchor({ state });
 * <Role {...props}>Anchor</Role>
 * <Tooltip state={state}>Tooltip</Tooltip>
 * ```
 */
const useTooltipAnchor = createHook(_ref => {
  var _state$contentElement, _state$contentElement2;

  let {
    state,
    described,
    ...props
  } = _ref;
  const onFocusProp = useEventCallback(props.onFocus);
  const onFocus = useCallback(event => {
    onFocusProp(event);
    if (event.defaultPrevented) return; // When using multiple anchors for the same tooltip, we need to
    // re-render the tooltip to update its position.

    if (state.anchorRef.current !== event.currentTarget) {
      state.anchorRef.current = event.currentTarget;
      state.render();
    }

    state.show();
  }, [onFocusProp, state.show]);
  const onBlurProp = useEventCallback(props.onBlur);
  const onBlur = useCallback(event => {
    onBlurProp(event);
    if (event.defaultPrevented) return;
    state.hide();
  }, [onBlurProp, state.hide]);
  const onMouseEnterProp = useEventCallback(props.onMouseEnter);
  const onMouseEnter = useCallback(event => {
    onMouseEnterProp(event);
    if (event.defaultPrevented) return; // When using multiple anchors for the same tooltip, we need to
    // re-render the tooltip to update its position.

    if (state.anchorRef.current !== event.currentTarget) {
      state.anchorRef.current = event.currentTarget;
      state.render();
    }

    state.show();
  }, [onMouseEnterProp, state.show]);
  const onMouseLeaveProp = useEventCallback(props.onMouseLeave);
  const onMouseLeave = useCallback(event => {
    onMouseLeaveProp(event);
    if (event.defaultPrevented) return;
    state.hide();
  }, [onMouseLeaveProp, state.hide]);
  props = {
    tabIndex: 0,
    "aria-labelledby": !described ? (_state$contentElement = state.contentElement) == null ? void 0 : _state$contentElement.id : undefined,
    "aria-describedby": described ? (_state$contentElement2 = state.contentElement) == null ? void 0 : _state$contentElement2.id : undefined,
    ...props,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave
  };
  props = usePopoverAnchor({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders an element that will be labelled or described by
 * a `Tooltip` component. This component will also be used as the reference to
 * position the tooltip on the screen.
 * @see https://ariakit.org/components/tooltip
 * @example
 * ```jsx
 * const tooltip = useTooltipState();
 * <TooltipAnchor state={tooltip}>Anchor</TooltipAnchor>
 * <Tooltip state={tooltip}>Tooltip</Tooltip>
 * ```
 */

const TooltipAnchor = createComponent(props => {
  const htmlProps = useTooltipAnchor(props);
  return createElement("div", htmlProps);
});

export { TooltipAnchor, useTooltipAnchor };
