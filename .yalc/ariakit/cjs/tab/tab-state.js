'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var hooks = require('ariakit-utils/hooks');
var store = require('ariakit-utils/store');
var collection_collectionState = require('../collection/collection-state.js');
var composite_compositeState = require('../composite/composite-state.js');

function findEnabledTabById(items, id) {
  return items.find(item => item.id === id && !item.disabled && !item.dimmed);
}

function findFirstEnabledTab(items) {
  return items.find(item => !item.disabled && !item.dimmed);
}
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


function useTabState(_temp) {
  let {
    orientation = "horizontal",
    focusLoop = true,
    selectOnMove = true,
    ...props
  } = _temp === void 0 ? {} : _temp;
  const [selectedId, setSelectedId] = hooks.useControlledState(props.defaultSelectedId, props.selectedId, props.setSelectedId);
  const composite = composite_compositeState.useCompositeState({
    orientation,
    focusLoop,
    ...props
  });
  const panels = collection_collectionState.useCollectionState();
  const compositeRef = hooks.useLiveRef(composite); // Selects the active tab when selectOnMove is true. Since we're listening to
  // the moves state, but not the activeId state, this effect will run only when
  // there's a move, which is usually triggered by moving through the tabs using
  // the keyboard.

  react.useEffect(() => {
    if (!selectOnMove) return;
    const {
      activeId,
      items
    } = compositeRef.current;
    if (!activeId) return;
    const tab = findEnabledTabById(items, activeId);
    if (!tab) return;
    setSelectedId(tab.id);
  }, [composite.moves, selectOnMove, setSelectedId]); // Keep activeId in sync with selectedId.

  react.useEffect(() => {
    if (selectedId === compositeRef.current.activeId) return;
    composite.setActiveId(selectedId);
  }, [selectedId, composite.setActiveId]); // Automatically set selectedId if it's undefined.

  react.useEffect(() => {
    if (selectedId !== undefined) return; // First, we try to set selectedId based on the current active tab.

    const activeId = compositeRef.current.activeId;
    const tab = findEnabledTabById(composite.items, activeId);

    if (tab) {
      setSelectedId(activeId);
    } // If there's no active tab or the active tab is dimmed, we get the first
    // enabled tab instead.
    else {
      const firstEnabledTab = findFirstEnabledTab(composite.items);
      setSelectedId(firstEnabledTab == null ? void 0 : firstEnabledTab.id);
    }
  }, [selectedId, composite.items, setSelectedId]); // Keep panels tabIds in sync with the current tabs.

  react.useEffect(() => {
    if (!composite.items.length) return;
    panels.setItems(prevPanels => {
      const hasOrphanPanels = prevPanels.some(panel => !panel.tabId);
      if (!hasOrphanPanels) return prevPanels;
      return prevPanels.map((panel, i) => {
        if (panel.tabId) return panel;
        const tab = composite.items[i];
        return { ...panel,
          tabId: tab == null ? void 0 : tab.id
        };
      });
    });
  }, [composite.items, panels.setItems]);
  const select = react.useCallback(id => {
    composite.move(id);
    setSelectedId(id);
  }, [composite.move, setSelectedId]);
  const state = react.useMemo(() => ({ ...composite,
    selectedId,
    setSelectedId,
    select,
    panels
  }), [composite, selectedId, setSelectedId, select, panels]);
  return store.useStorePublisher(state);
}

exports.useTabState = useTabState;
