import * as React from "react";

import {
  Disclosure,
  DisclosureContent,
  DisclosureInitialState,
  useDisclosureState,
} from "../../index";

export type DisclosureHorizontalProps = DisclosureInitialState & {};

export const DisclosureHorizontal: React.FC<DisclosureHorizontalProps> =
  props => {
    const state = useDisclosureState(props);
    const isOpen = state.visible || state.isPresent;

    return (
      <div className="root">
        <Disclosure {...state}>Show More</Disclosure>
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

export default DisclosureHorizontal;
