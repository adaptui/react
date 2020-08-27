import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "reakit";

import {
  useTabState,
  Tab,
  useTab,
  TabList,
  useTabList,
  TabPanel,
  useTabPanel,
} from "../index";

export default {
  title: "Component/Tab",
  component: Tab,
} as Meta;

export function Component() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab} disabled>
          Tab 2
        </Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}

export function DefaultSelected() {
  const tab = useTabState({ selectedId: "tab3" });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab} disabled>
          Tab 2
        </Tab>
        <Tab {...tab} id="tab3">
          Tab 3
        </Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}

export function NoSelected() {
  const tab = useTabState({ selectedId: null });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}

export function Manual() {
  const tab = useTabState({ manual: true });
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}

export function DetectingSelectedTab() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab} id="tab1">
          Tab 1
        </Tab>
        <Tab {...tab} id="tab2">
          Tab 2
        </Tab>
        <Tab {...tab} id="tab3">
          Tab 3
        </Tab>
      </TabList>
      <TabPanel {...tab}>{tab.selectedId === "tab1" && "Tab 1"}</TabPanel>
      <TabPanel {...tab}>{tab.selectedId === "tab2" && "Tab 2"}</TabPanel>
      <TabPanel {...tab}>{tab.selectedId === "tab3" && "Tab 3"}</TabPanel>
    </>
  );
}

export function NonTabbablePanels() {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab} tabIndex={undefined}>
        <Button>Button</Button>
      </TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </>
  );
}

export function Vertical() {
  const tab = useTabState({ orientation: "vertical" });
  return (
    <div style={{ display: "flex" }}>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab}>Tab 1</Tab>
        <Tab {...tab}>Tab 2</Tab>
        <Tab {...tab}>Tab 3</Tab>
      </TabList>
      <TabPanel {...tab}>Tab 1</TabPanel>
      <TabPanel {...tab}>Tab 2</TabPanel>
      <TabPanel {...tab}>Tab 3</TabPanel>
    </div>
  );
}
