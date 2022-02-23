'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_compositeItem = require('../composite/composite-item.js');
var __utils = require('../__utils-5fc7da9c.js');

function getPanelId(panels, id) {
  var _panels$items$find;

  if (!id) return;
  return panels == null ? void 0 : (_panels$items$find = panels.items.find(panel => panel.tabId === id)) == null ? void 0 : _panels$items$find.id;
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a tab element. The underlying element must be
 * wrapped in a `TabList` component or a component that implements the
 * `useTabList` props.
 * @see https://ariakit.org/components/tab
 * @example
 * ```jsx
 * const state = useTabState();
 * const props = useTab({ state });
 * <TabList state={state}>
 *   <Role {...props}>Tab 1</Role>
 * </TabList>
 * <TabPanel state={state}>Panel 1</TabPanel>
 * ```
 */


const useTab = system.createHook(_ref => {
  var _state2, _state3, _state4;

  let {
    state,
    accessibleWhenDisabled = true,
    getItem: getItemProp,
    ...props
  } = _ref;
  const id = hooks.useId(props.id);
  state = store.useStore(state || __utils.TabContext, [react.useCallback(s => id && s.selectedId === id, [id]), "panels", "setSelectedId"]);
  const dimmed = props.disabled;
  const getItem = react.useCallback(item => {
    const nextItem = { ...item,
      dimmed
    };

    if (getItemProp) {
      return getItemProp(nextItem);
    }

    return nextItem;
  }, [dimmed, getItemProp]);
  const onClickProp = hooks.useEventCallback(props.onClick);
  const onClick = react.useCallback(event => {
    var _state;

    onClickProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.setSelectedId(id);
  }, [onClickProp, (_state2 = state) == null ? void 0 : _state2.setSelectedId, id]);
  const panelId = getPanelId((_state3 = state) == null ? void 0 : _state3.panels, id);
  props = {
    id,
    role: "tab",
    "aria-selected": !!id && ((_state4 = state) == null ? void 0 : _state4.selectedId) === id,
    "aria-controls": panelId || undefined,
    ...props,
    onClick
  };
  props = composite_compositeItem.useCompositeItem({
    state,
    ...props,
    accessibleWhenDisabled,
    getItem
  });
  return props;
});
/**
 * A component that renders a tab element. The underlying element must be
 * wrapped in a `TabList` component.
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

const Tab = store.createMemoComponent(props => {
  const htmlProps = useTab(props);
  return system.createElement("button", htmlProps);
});

exports.Tab = Tab;
exports.useTab = useTab;
