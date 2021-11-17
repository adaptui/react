import * as React from "react";

import { Arrow } from "../Arrow";
import { ArrowContent } from "../ArrowContent";
import { Popover } from "../Popover";
import { PopoverContent } from "../PopoverContent";
import { PopoverDisclosure } from "../PopoverDisclosure";
import { PopoverInitialState, usePopoverState } from "../PopoverState";

export type PopoverBasicProps = PopoverInitialState & {};

export const PopoverBasic: React.FC<PopoverBasicProps> = props => {
  const state = usePopoverState({
    arrowOffset: 20,
    sideIndex: 2,
    alignIndex: 1,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200vh",
      }}
    >
      <PopoverDisclosure {...state}>Open</PopoverDisclosure>

      <Popover className="popover" {...state}>
        <PopoverContent {...state} className="content">
          <div className="content-inside">
            <button onClick={state.hide}>close</button>
          </div>
          <Arrow {...state}>
            <ArrowContent className="arrow" {...state}>
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
            </ArrowContent>
          </Arrow>
        </PopoverContent>
      </Popover>
      <input />
    </div>
  );
};
