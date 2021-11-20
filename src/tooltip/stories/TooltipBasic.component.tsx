import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipInitialState,
  TooltipReference,
  useTooltipState,
} from "../../index";

export type TooltipBasicProps = TooltipInitialState & {};

export const TooltipBasic: React.FC<TooltipBasicProps> = props => {
  const state = useTooltipState(props);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200vh",
      }}
    >
      <TooltipReference as="button" {...state}>
        Open
      </TooltipReference>

      <Tooltip className="popover" {...state}>
        <TooltipContent {...state} className="content" transitionPresent={true}>
          <div>Tooltip</div>
        </TooltipContent>
      </Tooltip>
      <input />
    </div>
  );
};
