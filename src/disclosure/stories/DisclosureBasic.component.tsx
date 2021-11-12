import * as React from "react";

import {
  DisclosureButton,
  DisclosureContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureBasicProps = DisclosureInitialState & {};

export const DisclosureBasic: React.FC<DisclosureBasicProps> = props => {
  const state = useDisclosureState(props);
  const isOpen = state.expanded || state.isPresent;

  return (
    <div>
      <DisclosureButton {...state}>Show More</DisclosureButton>
      <DisclosureContent
        style={{
          display: isOpen ? "flex" : "none",
        }}
        className="content"
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

export default DisclosureBasic;
