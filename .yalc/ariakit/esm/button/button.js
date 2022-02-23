import { useRef, useState, useEffect } from 'react';
import { isButton } from 'ariakit-utils/dom';
import { useTagName, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCommand } from '../command/command.js';

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

const useButton = createHook(props => {
  const ref = useRef(null);
  const tagName = useTagName(ref, props.as || "button");
  const [isNativeButton, setIsNativeButton] = useState(() => !!tagName && isButton({
    tagName,
    type: props.type
  }));
  useEffect(() => {
    if (!ref.current) return;
    setIsNativeButton(isButton(ref.current));
  }, []);
  props = {
    role: !isNativeButton && tagName !== "a" ? "button" : undefined,
    ...props,
    ref: useForkRef(ref, props.ref)
  };
  props = useCommand(props);
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

const Button = createComponent(props => {
  const htmlProps = useButton(props);
  return createElement("button", htmlProps);
});

export { Button, useButton };
