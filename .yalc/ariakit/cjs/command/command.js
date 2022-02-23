'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var dom = require('ariakit-utils/dom');
var events = require('ariakit-utils/events');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var focusable_focusable = require('../focusable/focusable.js');

function isNativeClick(event) {
  if (!event.isTrusted) return false; // istanbul ignore next: can't test trusted events yet

  const element = event.currentTarget;
  return dom.isButton(element) || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "A" || element.tagName === "SELECT";
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component. If the element is not a native clickable element (like a
 * button), the hook will return additional props to make sure it's accessible.
 * @see https://ariakit.org/components/command
 * @example
 * ```jsx
 * const props = useCommand({ as: "div" });
 * <Role {...props}>Accessible button</Role>
 * ```
 */


const useCommand = system.createHook(_ref => {
  let {
    clickOnEnter = true,
    clickOnSpace = true,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const tagName = hooks.useTagName(ref, props.as);
  const [isNativeButton, setIsNativeButton] = react.useState(() => !!tagName && dom.isButton({
    tagName,
    type: props.type
  }));
  react.useEffect(() => {
    if (!ref.current) return;
    setIsNativeButton(dom.isButton(ref.current));
  }, []);
  const [active, setActive] = react.useState(false);
  const activeRef = react.useRef(false);
  const isDuplicate = ("data-command" in props);
  const onKeyDownProp = hooks.useEventCallback(props.onKeyDown);
  const onKeyDown = react.useCallback(event => {
    onKeyDownProp(event);
    const element = event.currentTarget;
    if (event.defaultPrevented) return;
    if (isDuplicate) return;
    if (props.disabled) return;
    if (event.metaKey) return;
    if (!events.isSelfTarget(event)) return;
    if (dom.isTextField(element)) return;
    if (element.isContentEditable) return;
    const isEnter = clickOnEnter && event.key === "Enter";
    const isSpace = clickOnSpace && event.key === " ";
    const shouldPreventEnter = event.key === "Enter" && !clickOnEnter;
    const shouldPreventSpace = event.key === " " && !clickOnSpace;

    if (shouldPreventEnter || shouldPreventSpace) {
      event.preventDefault();
      return;
    }

    if (isEnter || isSpace) {
      const nativeClick = isNativeClick(event);

      if (isEnter) {
        if (!nativeClick) {
          event.preventDefault();
          const {
            view,
            ...eventInit
          } = event;
          events.queueBeforeEvent(element, "keyup", () => // Fire a click event instead of calling element.click()
          // directly so we can pass the modifier state to the click
          // event.
          events.fireClickEvent(element, eventInit));
        }
      } else if (isSpace) {
        activeRef.current = true;

        if (!nativeClick) {
          event.preventDefault();
          setActive(true);
        }
      }
    }
  }, [onKeyDownProp, isDuplicate, props.disabled, clickOnEnter, clickOnSpace]);
  const onKeyUpProp = hooks.useEventCallback(props.onKeyUp);
  const onKeyUp = react.useCallback(event => {
    onKeyUpProp(event);
    if (event.defaultPrevented) return;
    if (isDuplicate) return;
    if (props.disabled) return;
    if (event.metaKey) return;
    const isSpace = clickOnSpace && event.key === " ";

    if (activeRef.current && isSpace) {
      activeRef.current = false;

      if (!isNativeClick(event)) {
        setActive(false);
        const element = event.currentTarget;
        const {
          view,
          ...eventInit
        } = event;
        requestAnimationFrame(() => events.fireClickEvent(element, eventInit));
      }
    }
  }, [onKeyUpProp, isDuplicate, props.disabled, clickOnSpace]);
  props = {
    "data-command": "",
    "data-active": active ? "" : undefined,
    type: isNativeButton ? "button" : undefined,
    ...props,
    ref: hooks.useForkRef(ref, props.ref),
    onKeyDown,
    onKeyUp
  };
  props = focusable_focusable.useFocusable(props);
  return props;
});
/**
 * A component that renders a native clickable element (a button). If another
 * element is passed to the `as` prop, this component will make sure the
 * rendered element is accessible.
 * @see https://ariakit.org/components/command
 * @example
 * ```jsx
 * <Command as="div">Accessible button</Command>
 * ```
 */

const Command = system.createComponent(props => {
  props = useCommand(props);
  return system.createElement("button", props);
});

exports.Command = Command;
exports.useCommand = useCommand;
