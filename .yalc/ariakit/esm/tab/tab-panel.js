import { useRef, useState, useEffect, useCallback } from 'react';
import { getAllTabbableIn } from 'ariakit-utils/focus';
import { useId, useForkRef } from 'ariakit-utils/hooks';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useCollectionItem } from '../collection/collection-item.js';
import { useDisclosureState } from '../disclosure/disclosure-state.js';
import { useDisclosureContent } from '../disclosure/disclosure-content.js';
import { useFocusable } from '../focusable/focusable.js';

function getTabId(panels, id) {
  var _panels$items$find;

  if (!id) return;
  return (_panels$items$find = panels.items.find(panel => panel.id === id)) == null ? void 0 : _panels$items$find.tabId;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a tab panel element.
 * @see https://ariakit.org/components/tab
 * @example
 * ```jsx
 * const state = useTabState();
 * const props = useTabPanel({ state });
 * <TabList state={state}>
 *   <Tab>Tab 1</Tab>
 * </TabList>
 * <Role {...props}>Panel 1</Role>
 * ```
 */


const useTabPanel = createHook(_ref => {
  let {
    state,
    tabId: tabIdProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  const ref = useRef(null);
  const id = useId(props.id);
  const [hasTabbableChildren, setHasTabbableChildren] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const tabbable = getAllTabbableIn(element);
    setHasTabbableChildren(!!tabbable.length);
  }, []);
  const getItem = useCallback(item => {
    const nextItem = { ...item,
      id,
      tabId: tabIdProp
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [id, tabIdProp, getItemProp]);
  const tabId = tabIdProp || getTabId(state.panels, id);
  const visible = !!tabId && state.selectedId === tabId;
  props = {
    id,
    role: "tabpanel",
    "aria-labelledby": tabId || undefined,
    ...props,
    ref: useForkRef(ref, props.ref)
  };
  const disclosure = useDisclosureState({
    visible
  });
  props = useFocusable({
    focusable: !hasTabbableChildren,
    ...props
  });
  props = useDisclosureContent({
    state: disclosure,
    ...props
  });
  props = useCollectionItem({
    state: state.panels,
    ...props,
    getItem,
    shouldRegisterItem: !!id ? props.shouldRegisterItem : false
  });
  return props;
});
/**
 * A component that renders a tab panel element.
 * @see https://ariakit.org/components/tab
 * @example
 * ```jsx
 * const tab = useTabState();
 * <TabList state={tab}>
 *   <Tab>Tab 1</Tab>
 *   <Tab>Tab 2</Tab>
 * </TabList>
 * <TabPanel state={tab}>Panel 1</TabPanel>
 * <TabPanel state={tab}>Panel 2</TabPanel>
 * ```
 */

const TabPanel = createComponent(props => {
  const htmlProps = useTabPanel(props);
  return createElement("div", htmlProps);
});

export { TabPanel, useTabPanel };
