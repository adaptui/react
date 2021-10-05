import * as React from "react";

import {
  DisclosureButton,
  DisclosureContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureProps = DisclosureInitialState & {};

export const Disclosure: React.FC<DisclosureProps> = props => {
  const [hasExpandStarted, setHasExpandStarted] = React.useState(false);

  const state = useDisclosureState({
    ...props,
    onExpandStart: () => setHasExpandStarted(true),
    onCollapseEnd: () => setHasExpandStarted(false),
  });

  return (
    <div>
      <DisclosureButton {...state}>Show More</DisclosureButton>
      <DisclosureContent
        style={{
          display: hasExpandStarted ? "flex" : "none",
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
      </DisclosureContent>
    </div>
  );
};
export default Disclosure;
