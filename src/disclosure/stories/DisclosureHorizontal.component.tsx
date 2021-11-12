import * as React from "react";

import {
  DisclosureButton,
  DisclosureContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureProps = DisclosureInitialState & {};

export const Disclosure: React.FC<DisclosureProps> = props => {
  const state = useDisclosureState(props);
  const isOpen = state.expanded || state.isPresent;

  return (
    <div className="root">
      <DisclosureButton {...state}>Show More</DisclosureButton>
      <DisclosureContent
        style={{
          display: isOpen ? "flex" : "none",
        }}
        className="content"
        {...state}
      >
        <div className="item">Item 1</div>
        <div className="item">Item 2</div>
        <div className="item">Item 3</div>
        <div className="item">Item 4</div>
        <div className="item">Item 5</div>
        <div className="item">Item 6</div>
      </DisclosureContent>
    </div>
  );
};

export default Disclosure;
