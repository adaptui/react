import * as React from "react";
import { Disclosure, DisclosureStateProps, useDisclosureState } from "ariakit";

import { DisclosureCollapsibleContent } from "../../index";

export type DisclosureHorizontalCollapseBasicProps = DisclosureStateProps & {};

export const DisclosureHorizontalCollapseBasic: React.FC<
  DisclosureHorizontalCollapseBasicProps
> = props => {
  const state = useDisclosureState(props);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Disclosure state={state}>Show More</Disclosure>
      <DisclosureCollapsibleContent
        style={{
          display: "flex",
          flexDirection: "row",
        }}
        direction="horizontal"
        state={state}
      >
        <span style={{ flexShrink: 0 }}>Item 1</span>
        <span style={{ flexShrink: 0 }}>Item 2</span>
        <span style={{ flexShrink: 0 }}>Item 3</span>
        <span style={{ flexShrink: 0 }}>Item 4</span>
        <span style={{ flexShrink: 0 }}>Item 5</span>
        <span style={{ flexShrink: 0 }}>Item 6</span>
      </DisclosureCollapsibleContent>
    </div>
  );
};

export default DisclosureHorizontalCollapseBasic;
