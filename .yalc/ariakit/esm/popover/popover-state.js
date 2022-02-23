import { useRef, useState, useReducer, useMemo } from 'react';
import { createPopper, applyStyles } from '@popperjs/core';
import { useControlledState, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { useDialogState } from '../dialog/dialog-state.js';

function getDOMRect(anchorRect) {
  if (!anchorRect) return new DOMRect();
  const {
    x,
    y,
    width,
    height
  } = anchorRect;
  return new DOMRect(x, y, width, height);
}

function getAnchorElement(anchorRef, anchorRect) {
  const contextElement = anchorRef.current || undefined;
  return {
    contextElement,
    getBoundingClientRect: () => anchorRect || !contextElement ? getDOMRect(anchorRect) : contextElement.getBoundingClientRect()
  };
}
/**
 * Provides state for the `Popover` components.
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <PopoverDisclosure state={popover}>Disclosure</PopoverDisclosure>
 * <Popover state={popover}>Popover</Popover>
 * ```
 */


function usePopoverState(_temp) {
  let {
    placement = "bottom",
    fixed = false,
    padding = 8,
    arrowPadding = 4,
    flip = true,
    gutter,
    shift = 0,
    preventOverflow = true,
    sameWidth = false,
    renderCallback,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const dialog = useDialogState(props);
  const [anchorRect, setAnchorRect] = useControlledState(props.defaultAnchorRect || null, props.anchorRect, props.setAnchorRect);
  const anchorRef = useRef(null);
  const popoverRef = useRef(null);
  const arrowRef = useRef(null);
  const [currentPlacement, setCurrentPlacement] = useState(placement);
  const [rendered, render] = useReducer(() => ({}), {});
  useSafeLayoutEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const anchor = getAnchorElement(anchorRef, anchorRect);
    const arrow = arrowRef.current;
    const arrowOffset = ((arrow == null ? void 0 : arrow.clientHeight) || 0) / 2;
    const finalGutter = typeof gutter === "number" ? gutter + arrowOffset : gutter != null ? gutter : arrowOffset;

    const defaultRenderCallback = () => {
      const popper = createPopper(anchor, popover, {
        // https://popper.js.org/docs/v2/constructors/#options
        placement,
        strategy: fixed ? "fixed" : "absolute",
        modifiers: [{
          // https://popper.js.org/docs/v2/modifiers/event-listeners/
          name: "eventListeners",
          enabled: dialog.mounted
        }, {
          // https://popper.js.org/docs/v2/modifiers/apply-styles/
          name: "applyStyles",
          enabled: true,
          fn: args => {
            // Remove specific popper HTML attributes
            args.state.attributes.popper = {}; // Add specific arrow styles

            const arrowStyles = args.state.styles.arrow;

            if (arrowStyles) {
              const dir = args.state.placement.split("-")[0];
              arrowStyles[dir] = "100%";
            }

            applyStyles.fn(args);
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/flip/
          name: "flip",
          enabled: flip && dialog.mounted,
          options: {
            padding
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/offset/
          name: "offset",
          options: {
            // Makes sure the shift value is applied to the popover element
            // consistently no matter the placement. That is, a negative shift
            // should move down a popover with a "right-end" placement, but
            // move it up when the placement is "right-start". A good example
            // is a sub menu that must have a small negative shift so the
            // first menu item is aligned with its menu button.
            offset: _ref => {
              let {
                placement
              } = _ref;
              const start = placement.split("-")[1] === "start";
              return [start ? shift : -shift, finalGutter];
            }
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
          name: "preventOverflow",
          enabled: preventOverflow && dialog.mounted,
          options: {
            padding,
            tetherOffset: finalGutter
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/arrow/
          name: "arrow",
          enabled: !!arrow,
          options: {
            element: arrow,
            padding: arrowPadding
          }
        }, {
          // https://codesandbox.io/s/bitter-sky-pe3z9?file=/src/index.js
          name: "sameWidth",
          enabled: sameWidth,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: _ref2 => {
            let {
              state
            } = _ref2;

            if (state.styles.popper) {
              state.styles.popper.width = state.rects.reference.width + "px";
            }
          },
          effect: _ref3 => {
            let {
              state
            } = _ref3;
            const {
              reference
            } = state.elements;
            const referenceElement = "contextElement" in reference ? reference.contextElement : reference;

            if (referenceElement && "offsetWidth" in referenceElement) {
              const referenceWidth = referenceElement.offsetWidth + "px";
              state.elements.popper.style.width = referenceWidth;
            }
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
          name: "updateState",
          phase: "write",
          requires: ["computeStyles"],
          enabled: dialog.mounted && process.env.NODE_ENV !== "test",
          fn: _ref4 => {
            let {
              state
            } = _ref4;
            return setCurrentPlacement(state.placement);
          }
        }]
      });
      return popper.destroy;
    };

    if (renderCallback) {
      return renderCallback({
        defaultRenderCallback,
        setPlacement: setCurrentPlacement,
        mounted: dialog.mounted,
        gutter: finalGutter,
        placement,
        fixed,
        flip,
        padding,
        arrowPadding,
        preventOverflow,
        sameWidth,
        shift,
        popover,
        anchor,
        arrow
      });
    }

    return defaultRenderCallback();
  }, [rendered, dialog.contentElement, anchorRect, shift, gutter, renderCallback, placement, fixed, dialog.mounted, flip, padding, arrowPadding, preventOverflow, sameWidth]);
  const state = useMemo(() => ({ ...dialog,
    anchorRect,
    setAnchorRect,
    anchorRef,
    popoverRef,
    arrowRef,
    currentPlacement,
    placement,
    fixed,
    padding,
    arrowPadding,
    flip,
    gutter,
    shift,
    preventOverflow,
    sameWidth,
    render,
    renderCallback
  }), [dialog, anchorRect, setAnchorRect, currentPlacement, placement, fixed, padding, arrowPadding, flip, gutter, shift, preventOverflow, sameWidth, render, renderCallback]);
  return state;
}

export { usePopoverState };
