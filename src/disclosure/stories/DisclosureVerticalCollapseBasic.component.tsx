import * as React from "react";
import { Disclosure, DisclosureStateProps, useDisclosureState } from "ariakit";

import { DisclosureCollapsibleContent } from "../../index";

export type DisclosureVerticalCollapseBasicProps = DisclosureStateProps & {};

export const DisclosureVerticalCollapseBasic: React.FC<
  DisclosureVerticalCollapseBasicProps
> = props => {
  const state = useDisclosureState(props);

  return (
    <div>
      <Disclosure state={state}>Show More</Disclosure>
      <DisclosureCollapsibleContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        direction="vertical"
        state={state}
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
      </DisclosureCollapsibleContent>
    </div>
  );
};

export default DisclosureVerticalCollapseBasic;
