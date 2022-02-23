import { useCallback } from 'react';
import { useEventCallback, useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useDialogDisclosure } from '../dialog/dialog-disclosure.js';
import { P as PopoverContext } from '../__utils-3e6151ed.js';
import { usePopoverAnchor } from './popover-anchor.js';
import { jsx } from 'react/jsx-runtime';

const usePopoverDisclosure = createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    state.anchorRef.current = event.currentTarget;
    state.setAnchorRect(null);
    onClickProp(event);
  }, [state.anchorRef, state.setAnchorRect, onClickProp]);
  props = useWrapElement(props, element => /*#__PURE__*/jsx(PopoverContext.Provider, {
    value: state,
    children: element
  }), [state]);
  props = { ...props,
    onClick
  };
  props = usePopoverAnchor({
    state,
    ...props
  });
  props = useDialogDisclosure({
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

const PopoverDisclosure = createComponent(props => {
  const htmlProps = usePopoverDisclosure(props);
  return createElement("button", htmlProps);
});

export { PopoverDisclosure, usePopoverDisclosure };
