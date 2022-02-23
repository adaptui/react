import { As, Props } from "ariakit-utils/types";
import { CompositeOptions } from "../composite/composite";
import { TabState } from "./tab-state";
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
export declare const useTabList: import("ariakit-utils/types").Hook<TabListOptions<"div">>;
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
export declare const TabList: import("ariakit-utils/types").Component<TabListOptions<"div">>;
export declare type TabListOptions<T extends As = "div"> = Omit<CompositeOptions<T>, "state"> & {
    /**
     * Object returned by the `useTabState` hook.
     */
    state: TabState;
};
export declare type TabListProps<T extends As = "div"> = Props<TabListOptions<T>>;
