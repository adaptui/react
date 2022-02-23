'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = require('ariakit-utils/store');
var system = require('ariakit-utils/system');
var composite_composite = require('../composite/composite.js');
var __utils = require('../__utils-5fc7da9c.js');

/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a tab list element.
 * @see https://ariakit.org/components/tab
 * @example
 * ```jsx
 * const state = useTabState();
 * const props = useTabList({ state });
 * <Role {...props}>
 *   <Tab>Tab 1</Tab>
 *   <Tab>Tab 2</Tab>
 * </Role>
 * <TabPanel state={state}>Panel 1</TabPanel>
 * <TabPanel state={state}>Panel 2</TabPanel>
 * ```
 */
const useTabList = system.createHook(_ref => {
  let {
    state,
    ...props
  } = _ref;
  const orientation = state.orientation === "both" ? undefined : state.orientation;
  props = {
    role: "tablist",
    "aria-orientation": orientation,
    ...props
  };
  props = store.useStoreProvider({
    state,
    ...props
  }, __utils.TabContext);
  props = composite_composite.useComposite({
    state,
    ...props
  });
  return props;
});
/**
 * A component that renders a tab list element.
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

const TabList = system.createComponent(props => {
  const htmlProps = useTabList(props);
  return system.createElement("div", htmlProps);
});

exports.TabList = TabList;
exports.useTabList = useTabList;
