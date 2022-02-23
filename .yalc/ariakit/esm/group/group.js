import { useState } from 'react';
import { useWrapElement } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { G as GroupLabelContext } from '../__utils-33f6902f.js';
import { jsx } from 'react/jsx-runtime';

const useGroup = createHook(props => {
  const [labelId, setLabelId] = useState();
  props = useWrapElement(props, element => /*#__PURE__*/jsx(GroupLabelContext.Provider, {
    value: setLabelId,
    children: element
  }), []);
  props = {
    role: "group",
    "aria-labelledby": labelId,
    ...props
  };
  return props;
});
/**
 * A component that renders a group element.
 * @see https://ariakit.org/components/group
 * @example
 * ```jsx
 * <Group>Group</Group>
 * ```
 */

const Group = createComponent(props => {
  const htmlProps = useGroup(props);
  return createElement("div", htmlProps);
});

export { Group, useGroup };
