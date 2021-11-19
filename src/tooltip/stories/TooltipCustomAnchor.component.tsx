import * as React from "react";

import {
  Tooltip,
  TooltipAnchor,
  TooltipArrow,
  TooltipArrowContent,
  TooltipContent,
  TooltipInitialState,
  TooltipTrigger,
  useTooltipState,
} from "../../index";

export type TooltipCustomAnchorProps = TooltipInitialState & {};

export const TooltipCustomAnchor: React.FC<TooltipCustomAnchorProps> =
  props => {
    const state = useTooltipState(props);

    return (
      <div>
        <TooltipTrigger
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
          Tooltip Trigger
          <TooltipAnchor {...state}>Open</TooltipAnchor>
        </TooltipTrigger>

        <Tooltip className="popover" {...state}>
          <TooltipContent {...state} className="content" animation={true}>
            <div className="content-inside">Tooltip Content</div>
            <TooltipArrow {...state}>
              <TooltipArrowContent className="arrow" {...state}>
                <svg
                  width={20}
                  height={10}
                  viewBox="0 0 30 10"
                  preserveAspectRatio="none"
                  style={{ display: "block" }}
                  fill="#222"
                >
                  <polygon points="0,0 30,0 15,10" />
                </svg>
              </TooltipArrowContent>
            </TooltipArrow>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  };
