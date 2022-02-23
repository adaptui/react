import { As, Props } from "ariakit-utils/types";
import { CollectionItemOptions } from "../collection/collection-item";
import { DisclosureContentOptions } from "../disclosure";
import { FocusableOptions } from "../focusable";
import { TabState } from "./tab-state";
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
export declare const useTabPanel: import("ariakit-utils/types").Hook<TabPanelOptions<"div">>;
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
export declare const TabPanel: import("ariakit-utils/types").Component<TabPanelOptions<"div">>;
export declare type TabPanelOptions<T extends As = "div"> = FocusableOptions<T> & Omit<CollectionItemOptions, "state"> & Omit<DisclosureContentOptions<T>, "state"> & {
    /**
     * Object returned by the `useTabState` hook.
     */
    state: TabState;
    /**
     * The id of the tab that controls this panel. By default, this value will
     * be inferred based on the order of the tabs and the panels.
     */
    tabId?: string | null;
};
export declare type TabPanelProps<T extends As = "div"> = Props<TabPanelOptions<T>>;
