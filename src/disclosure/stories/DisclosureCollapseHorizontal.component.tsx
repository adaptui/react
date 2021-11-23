import * as React from "react";

import {
  Disclosure,
  DisclosureCollapseContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureCollapseHorizontalProps = DisclosureInitialState & {};

export const DisclosureCollapseHorizontal: React.FC<DisclosureCollapseHorizontalProps> =
  props => {
    const state = useDisclosureState(props);

    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Disclosure {...state}>Show More</Disclosure>
        <DisclosureCollapseContent
          style={{
            display: "flex",
            flexDirection: "row",
          }}
          direction="horizontal"
          {...state}
        >
          <span style={{ flexShrink: 0 }}>Item 1</span>
          <span style={{ flexShrink: 0 }}>Item 2</span>
          <span style={{ flexShrink: 0 }}>Item 3</span>
          <span style={{ flexShrink: 0 }}>Item 4</span>
          <span style={{ flexShrink: 0 }}>Item 5</span>
          <span style={{ flexShrink: 0 }}>Item 6</span>
        </DisclosureCollapseContent>
      </div>
    );
  };

export default DisclosureCollapseHorizontal;
