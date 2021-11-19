import * as React from "react";

import {
  Tooltip,
  TooltipArrow,
  TooltipArrowContent,
  TooltipContent,
  TooltipInitialState,
  TooltipReference,
  useTooltipState,
} from "../../index";

export type TooltipCustomDurationProps = {};

export const TooltipCustomDuration: React.FC<TooltipCustomDurationProps> =
  props => {
    return (
      <>
        <h1>Duration</h1>
        <h2>Default (Instant)</h2>
        <div style={{ display: "flex", gap: 50 }}>
          <TooltipBasic />
          <TooltipBasic />
          <TooltipBasic />
        </div>

        <h2>Custom (750ms)</h2>
        <div style={{ display: "flex", gap: 50 }}>
          <TooltipBasic unstable_timeout={750} />
          <TooltipBasic unstable_timeout={750} />
          <TooltipBasic unstable_timeout={750} />
        </div>
      </>
    );
  };

export type TooltipBasicProps = TooltipInitialState & {
  label?: string;
};

export const TooltipBasic: React.FC<TooltipBasicProps> = props => {
  const { label, children, ...restProps } = props;
  const state = useTooltipState({
    sideOffset: 5,
    arrowOffset: 10,
    ...restProps,
  });

  return (
    <>
      <TooltipReference as="button" className="trigger" {...state}>
        TooltipTrigger
      </TooltipReference>

      <Tooltip className="popover" {...state}>
        <TooltipContent {...state} className="content" animation={true}>
          TooltipContent
          <TooltipArrow {...state}>
            <TooltipArrowContent className="arrow" {...state}>
              <svg
                width={10}
                height={5}
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
    </>
  );
};
