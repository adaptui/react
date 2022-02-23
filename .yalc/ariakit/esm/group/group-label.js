import { useContext } from 'react';
import { useId, useSafeLayoutEffect } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { G as GroupLabelContext } from '../__utils-33f6902f.js';

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

const useGroupLabel = createHook(props => {
  const setLabelId = useContext(GroupLabelContext);
  const id = useId(props.id);
  useSafeLayoutEffect(() => {
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

const GroupLabel = createComponent(props => {
  const htmlProps = useGroupLabel(props);
  return createElement("div", htmlProps);
});

export { GroupLabel, useGroupLabel };
