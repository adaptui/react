'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var __utils = require('../__utils-c8a939b6.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a label in a group. This hook must be used in a
 * component that's wrapped with `Group` so the `aria-labelledby` prop is
 * properly set on the group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * // This component must be wrapped with Group
 * const props = useGroupLabel();
 * <Role {...props}>Label</Role>
 * ```
 */

const useGroupLabel = system.createHook(props => {
  const setLabelId = react.useContext(__utils.GroupLabelContext);
  const id = hooks.useId(props.id);
  hooks.useSafeLayoutEffect(() => {
    setLabelId == null ? void 0 : setLabelId(id);
    return () => setLabelId == null ? void 0 : setLabelId(undefined);
  }, [setLabelId, id]);
  props = {
    id,
    "aria-hidden": true,
    ...props
  };
  return props;
});
/**
 * A component that renders a label in a group. This component must be wrapped
 * with `Group` so the `aria-labelledby` prop is properly set on the group
 * element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * <Group>
 *   <GroupLabel>Label</GroupLabel>
 * </Group>
 * ```
 */

const GroupLabel = system.createComponent(props => {
  const htmlProps = useGroupLabel(props);
  return system.createElement("div", htmlProps);
});

exports.GroupLabel = GroupLabel;
exports.useGroupLabel = useGroupLabel;
