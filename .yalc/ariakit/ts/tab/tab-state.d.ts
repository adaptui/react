import { SetState } from "ariakit-utils/types";
import { CollectionState } from "../collection/collection-state";
import { CompositeState, CompositeStateProps } from "../composite/composite-state";
declare type Item = CompositeState["items"][number] & {
    dimmed?: boolean;
};
declare type Panel = CollectionState["items"][number] & {
    id: string;
    tabId?: string | null;
};
/**
 * Provides state for the `Tab` components.
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
export declare function useTabState({ orientation, focusLoop, selectOnMove, ...props }?: TabStateProps): TabState;
export declare type TabState = CompositeState<Item> & {
    /**
     * The id of the tab whose panel is currently visible.
     */
    selectedId: TabState["activeId"];
    /**
     * Sets the `selectedId` state.
     */
    setSelectedId: SetState<TabState["selectedId"]>;
    /**
     * Selects the tab panel for the tab with the given id.
     */
    select: TabState["move"];
    /**
     * A collection state containing the tab panels.
     */
    panels: CollectionState<Panel>;
    /**
     * Whether the tab should be selected when it receives focus. If it's set to
     * `false`, the tab will be selected only when it's clicked.
     * @default true
     */
    selectOnMove?: boolean;
};
export declare type TabStateProps = CompositeStateProps<Item> & Partial<Pick<TabState, "selectedId" | "selectOnMove">> & {
    /**
     * The id of the tab whose panel should be initially visible.
     * @example
     * ```jsx
     * const tab = useTabState({ defaultSelectedId: "tab-1" });
     * <TabList state={tab}>
     *   <Tab id="tab-1">Tab 1</Tab>
     * </TabList>
     * <TabPanel state={tab}>Panel 1</TabPanel>
     * ```
     */
    defaultSelectedId?: TabState["selectedId"];
    /**
     * Function that will be called when setting the tab `selectedId` state.
     * @example
     * function Tabs({ visibleTab, onTabChange }) {
     *   const tab = useTabState({
     *     selectedId: visibleTab,
     *     setSelectedId: onTabChange,
     *   });
     * }
     */
    setSelectedId?: (selectedId: TabState["selectedId"]) => void;
};
export {};
