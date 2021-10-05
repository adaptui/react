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
    <div style={{ display: "flex", height: "100%" }}>
      <DisclosureButton {...state}>Show More</DisclosureButton>
      <DisclosureContent
        style={{
          display: hasExpandStarted ? "flex" : "none",
          flexDirection: "row",
        }}
        {...state}
      >
        <div style={{ flexShrink: 0 }}>Item 1</div>
        <div style={{ flexShrink: 0 }}>Item 2</div>
        <div style={{ flexShrink: 0 }}>Item 3</div>
        <div style={{ flexShrink: 0 }}>Item 4</div>
        <div style={{ flexShrink: 0 }}>Item 5</div>
        <div style={{ flexShrink: 0 }}>Item 6</div>
      </DisclosureContent>
    </div>
  );
};

export default Disclosure;
