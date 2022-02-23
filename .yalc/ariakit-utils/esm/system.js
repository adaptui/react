import { forwardRef } from 'react';
import { hasOwnProperty } from './misc.js';
import { jsx } from 'react/jsx-runtime';

function isRenderProp(children) {
  return typeof children === "function";
}
/**
 * Creates a type-safe component with the `as` prop and `React.forwardRef`.
 *
 * @example
 * import { createComponent } from "ariakit-utils/system";
 *
 * type Props = {
 *   as?: "div";
 *   customProp?: boolean;
 * };
 *
 * const Component = createComponent<Props>(({ customProp, ...props }) => {
 *   return <div {...props} />;
 * });
 *
 * <Component as="button" customProp />
 */


function createComponent(render) {
  const Role = (props, ref) => render({
    ref,
    ...props
  });

  return /*#__PURE__*/forwardRef(Role);
}
/**
 * Creates a React element that supports the `as` prop, children as a
 * function (render props) and a `wrapElement` function.
 *
 * @example
 * import { createElement } from "ariakit-utils/system";
 *
 * function Component() {
 *   const props = {
 *     as: "button" as const,
 *     children: (htmlProps) => <button {...htmlProps} />,
 *     wrapElement: (element) => <div>{element}</div>,
 *   };
 *   return createElement("div", props);
 * }
 */

function createElement(Type, props) {
  const {
    as: As,
    wrapElement,
    ...rest
  } = props;
  let element;

  if (As && typeof As !== "string") {
    element = /*#__PURE__*/jsx(As, { ...rest
    });
  } else if (isRenderProp(props.children)) {
    const {
      children,
      ...otherProps
    } = rest;
    element = props.children(otherProps);
  } else if (As) {
    element = /*#__PURE__*/jsx(As, { ...rest
    });
  } else {
    element = /*#__PURE__*/jsx(Type, { ...rest
    });
  }

  if (wrapElement) {
    return wrapElement(element);
  }

  return element;
}
/**
 * Creates a component hook that accepts props and returns props so they can be
 * passed to a React element.
 *
 * @example
 * import { Options, createHook } from "ariakit-utils/system";
 *
 * type Props = Options<"div"> & {
 *   customProp?: boolean;
 * };
 *
 * const useComponent = createHook<Props>(({ customProp, ...props }) => {
 *   return props;
 * });
 *
 * const props = useComponent({ as: "button", customProp: true });
 */

function createHook(useProps) {
  const useRole = function (props) {
    if (props === void 0) {
      props = {};
    }

    const htmlProps = useProps(props);
    const copy = {};

    for (const prop in htmlProps) {
      if (hasOwnProperty(htmlProps, prop) && htmlProps[prop] !== undefined) {
        copy[prop] = htmlProps[prop];
      }
    }

    return copy;
  };

  return useRole;
}

export { createComponent, createElement, createHook };
