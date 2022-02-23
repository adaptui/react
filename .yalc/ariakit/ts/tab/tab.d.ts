import { As, Props } from "ariakit-utils/types";
import { CompositeItemOptions } from "../composite/composite-item";
import { TabState } from "./tab-state";
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
export declare const useTab: import("ariakit-utils/types").Hook<TabOptions<"button">>;
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
export declare const Tab: import("ariakit-utils/types").Component<TabOptions<"button">>;
export declare type TabOptions<T extends As = "button"> = Omit<CompositeItemOptions<T>, "state"> & {
    /**
     * Object returned by the `useTabState` hook. If not provided, the parent
     * `TabList` component's context will be used.
     */
    state?: TabState;
};
export declare type TabProps<T extends As = "button"> = Props<TabOptions<T>>;
