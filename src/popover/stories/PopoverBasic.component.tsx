import * as React from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowContent,
  PopoverContent,
  PopoverInitialState,
  PopoverTrigger,
  usePopoverState,
} from "../../index";

export type PopoverBasicProps = PopoverInitialState & {};

export const PopoverBasic: React.FC<PopoverBasicProps> = props => {
  const state = usePopoverState(props);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200vh",
      }}
    >
      <PopoverTrigger
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: 250,
          padding: 20,
          margin: 100,
          backgroundColor: "#eee",
        }}
        {...state}
      >
        Item
        <PopoverAnchor {...state}>Open</PopoverAnchor>
      </PopoverTrigger>

      <Popover className="popover" {...state}>
        <PopoverContent {...state} className="content" animation={true}>
          <div className="content-inside">
            <button onClick={state.hide}>close</button>
          </div>
          <PopoverArrow {...state}>
            <PopoverArrowContent className="arrow" {...state}>
              <svg
                width={20}
                height={10}
                viewBox="0 0 30 10"
                preserveAspectRatio="none"
                style={{ display: "block" }}
                fill="gray"
              >
                <polygon points="0,0 30,0 15,10" />
              </svg>
            </PopoverArrowContent>
          </PopoverArrow>
        </PopoverContent>
      </Popover>
      <input />
    </div>
  );
};
