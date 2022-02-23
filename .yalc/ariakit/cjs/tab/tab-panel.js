'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var focus = require('ariakit-utils/focus');
var hooks = require('ariakit-utils/hooks');
var system = require('ariakit-utils/system');
var collection_collectionItem = require('../collection/collection-item.js');
var disclosure_disclosureState = require('../disclosure/disclosure-state.js');
var disclosure_disclosureContent = require('../disclosure/disclosure-content.js');
var focusable_focusable = require('../focusable/focusable.js');

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


const useTabPanel = system.createHook(_ref => {
  let {
    state,
    tabId: tabIdProp,
    getItem: getItemProp,
    ...props
  } = _ref;
  const ref = react.useRef(null);
  const id = hooks.useId(props.id);
  const [hasTabbableChildren, setHasTabbableChildren] = react.useState(false);
  react.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const tabbable = focus.getAllTabbableIn(element);
    setHasTabbableChildren(!!tabbable.length);
  }, []);
  const getItem = react.useCallback(item => {
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
    ref: hooks.useForkRef(ref, props.ref)
  };
  const disclosure = disclosure_disclosureState.useDisclosureState({
    visible
  });
  props = focusable_focusable.useFocusable({
    focusable: !hasTabbableChildren,
    ...props
  });
  props = disclosure_disclosureContent.useDisclosureContent({
    state: disclosure,
    ...props
  });
  props = collection_collectionItem.useCollectionItem({
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

const TabPanel = system.createComponent(props => {
  const htmlProps = useTabPanel(props);
  return system.createElement("div", htmlProps);
});

exports.TabPanel = TabPanel;
exports.useTabPanel = useTabPanel;
