'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var command_command = require('../command/command.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. If the element is not a native button, the hook will
 * return additional props to make sure it's accessible.
 * @see https://ariakit.org/components/button
 * @example
 * ```jsx
 * const props = useButton({ as: "div" });
 * <Role {...props}>Accessible button</Role>
 * ```
 */

const useButton = system.createHook(props => {
  const ref = react.useRef(null);
  const tagName = hooks.useTagName(ref, props.as || "button");
  const [isNativeButton, setIsNativeButton] = react.useState(() => !!tagName && dom.isButton({
    tagName,
    type: props.type
  }));
  react.useEffect(() => {
    if (!ref.current) return;
    setIsNativeButton(dom.isButton(ref.current));
  }, []);
  props = {
    role: !isNativeButton && tagName !== "a" ? "button" : undefined,
    ...props,
    ref: hooks.useForkRef(ref, props.ref)
  };
  props = command_command.useCommand(props);
  return props;
});
/**
 * A component that renders a native accessible button. If another element is
 * passed to the `as` prop, this component will make sure the rendered element is
 * accessible.
 * @see https://ariakit.org/components/button
 * @example
 * ```jsx
 * <Button as="div">Accessible button</Button>
 * ```
 */

const Button = system.createComponent(props => {
  const htmlProps = useButton(props);
  return system.createElement("button", htmlProps);
});

exports.Button = Button;
exports.useButton = useButton;
