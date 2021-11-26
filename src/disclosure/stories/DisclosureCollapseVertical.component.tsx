import * as React from "react";

import {
  Disclosure,
  DisclosureCollapseContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureCollapseVerticalProps = DisclosureInitialState & {};

export const DisclosureCollapseVertical: React.FC<
  DisclosureCollapseVerticalProps
> = props => {
  const state = useDisclosureState(props);

  return (
    <div>
      <Disclosure {...state}>Show More</Disclosure>
      <DisclosureCollapseContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        {...state}
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
      </DisclosureCollapseContent>
    </div>
  );
};

export default DisclosureCollapseVertical;
