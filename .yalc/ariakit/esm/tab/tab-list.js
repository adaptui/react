import { useStoreProvider } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { useComposite } from '../composite/composite.js';
import { T as TabContext } from '../__utils-73a31bac.js';

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
const useTabList = createHook(_ref => {
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
  props = useStoreProvider({
    state,
    ...props
  }, TabContext);
  props = useComposite({
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

const TabList = createComponent(props => {
  const htmlProps = useTabList(props);
  return createElement("div", htmlProps);
});

export { TabList, useTabList };
