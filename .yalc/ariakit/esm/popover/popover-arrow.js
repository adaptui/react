import { useContext, useMemo, useState } from 'react';
import { getWindow } from 'ariakit-utils/dom';
import { useForkRef, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { P as PopoverContext } from '../__utils-3e6151ed.js';
import { jsx, jsxs } from 'react/jsx-runtime';

/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications Copyright 2019 - present by Diego Haz.
 *
 * Extracted the SVG path only.
 */
const POPOVER_ARROW_PATH = "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z";

const defaultSize = 30;
const halfDefaultSize = defaultSize / 2;
const rotateMap = {
  top: "rotate(180 " + halfDefaultSize + " " + halfDefaultSize + ")",
  right: "rotate(-90 " + halfDefaultSize + " " + halfDefaultSize + ")",
  bottom: "rotate(0 " + halfDefaultSize + " " + halfDefaultSize + ")",
  left: "rotate(90 " + halfDefaultSize + " " + halfDefaultSize + ")"
};

function useComputedStyle(element) {
  const [style, setStyle] = useState();
  useSafeLayoutEffect(() => {
    if (!element) return;
    const computedStyle = getWindow(element).getComputedStyle(element);
    setStyle(computedStyle);
  }, [element]);
  return style;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render an arrow inside a popover element.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const state = usePopoverState();
 * const props = usePopoverArrow({ state });
 * <Popover state={state}>
 *   <Role {...props} />
 *   Popover
 * </Popover>
 * ```
 */


const usePopoverArrow = createHook(_ref => {
  var _state, _state2, _state3;

  let {
    state,
    size = defaultSize,
    ...props
  } = _ref;
  const context = useContext(PopoverContext);
  state = state || context;
  const dir = (_state = state) == null ? void 0 : _state.currentPlacement.split("-")[0];
  const style = useComputedStyle((_state2 = state) == null ? void 0 : _state2.contentElement);
  const fill = (style == null ? void 0 : style.getPropertyValue("background-color")) || "none";
  const stroke = (style == null ? void 0 : style.getPropertyValue("border-" + dir + "-color")) || "none";
  const borderWidth = (style == null ? void 0 : style.getPropertyValue("border-" + dir + "-width")) || "0px";
  const strokeWidth = parseInt(borderWidth) * 2 * (defaultSize / size);
  const transform = rotateMap[dir];
  const children = useMemo(() => /*#__PURE__*/jsx("svg", {
    display: "block",
    viewBox: "0 0 30 30",
    children: /*#__PURE__*/jsxs("g", {
      transform: transform,
      children: [/*#__PURE__*/jsx("path", {
        fill: "none",
        d: POPOVER_ARROW_PATH
      }), /*#__PURE__*/jsx("path", {
        stroke: "none",
        d: POPOVER_ARROW_PATH
      })]
    })
  }), [transform]);
  props = {
    children,
    "aria-hidden": true,
    ...props,
    ref: useForkRef((_state3 = state) == null ? void 0 : _state3.arrowRef, props.ref),
    style: {
      // server side rendering
      position: "absolute",
      fontSize: size,
      width: "1em",
      height: "1em",
      pointerEvents: "none",
      fill,
      stroke,
      strokeWidth,
      ...props.style
    }
  };
  return props;
});
/**
 * A component that renders an arrow inside a `Popover` component.
 * @see https://ariakit.org/components/popover
 * @example
 * ```jsx
 * const popover = usePopoverState();
 * <Popover state={popover}>
 *   <PopoverArrow />
 *   Popover
 * </Popover>
 * ```
 */

const PopoverArrow = createComponent(props => {
  const htmlProps = usePopoverArrow(props);
  return createElement("div", htmlProps);
});

export { PopoverArrow, usePopoverArrow };
