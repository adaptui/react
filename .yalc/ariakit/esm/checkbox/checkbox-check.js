import { useContext } from 'react';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { C as CheckboxCheckedContext } from '../__utils-fdd6f8a4.js';
import { jsx } from 'react/jsx-runtime';

const checkmark = /*#__PURE__*/jsx("svg", {
  display: "block",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.5pt",
  viewBox: "0 0 16 16",
  height: "1em",
  width: "1em",
  children: /*#__PURE__*/jsx("polyline", {
    points: "4,8 7,12 12,4"
  })
});

function getChildren(props) {
  if (props.checked) {
    return props.children || checkmark;
  }

  if (typeof props.children === "function") {
    return props.children;
  }

  return null;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a check mark icon.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * const props = useCheckboxCheck({ checked: true });
 * <Role {...props} />
 * ```
 */


const useCheckboxCheck = createHook(_ref => {
  var _checked;

  let {
    state,
    checked,
    ...props
  } = _ref;
  const context = useContext(CheckboxCheckedContext);
  checked = (_checked = checked) != null ? _checked : context;
  const children = getChildren({
    checked,
    children: props.children
  });
  props = {
    "aria-hidden": true,
    ...props,
    children,
    style: {
      width: "1em",
      height: "1em",
      pointerEvents: "none",
      ...props.style
    }
  };
  return props;
});
/**
 * A component that renders a a check mark icon.
 * @see https://ariakit.org/components/checkbox
 * @example
 * ```jsx
 * <CheckboxCheck checked />
 * ```
 */

const CheckboxCheck = createComponent(props => {
  const htmlProps = useCheckboxCheck(props);
  return createElement("span", htmlProps);
});

export { CheckboxCheck, useCheckboxCheck };
