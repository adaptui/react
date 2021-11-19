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

export type TooltipPositionsProps = TooltipInitialState & {};

export const TooltipPositions: React.FC<TooltipPositionsProps> = props => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 50px)",
        }}
      >
        <TooltipBasic
          side="top"
          align="start"
          label="Top start"
          style={{ gridColumn: "2", gridRow: "1" }}
        />
        <TooltipBasic
          side="top"
          align="center"
          label="Top center"
          style={{ gridColumn: "3", gridRow: "1" }}
        />
        <TooltipBasic
          side="top"
          align="end"
          label="Top end"
          style={{ gridColumn: "4", gridRow: "1" }}
        />

        <TooltipBasic
          side="right"
          align="start"
          label="Right start"
          style={{ gridColumn: "5", gridRow: "2" }}
        />
        <TooltipBasic
          side="right"
          align="center"
          label="Right center"
          style={{ gridColumn: "5", gridRow: "3" }}
        />
        <TooltipBasic
          side="right"
          align="end"
          label="Right end"
          style={{ gridColumn: "5", gridRow: "4" }}
        />

        <TooltipBasic
          side="bottom"
          align="start"
          label="Bottom start"
          style={{ gridColumn: "2", gridRow: "5" }}
        />
        <TooltipBasic
          side="bottom"
          align="center"
          label="Bottom center"
          style={{ gridColumn: "3", gridRow: "5" }}
        />
        <TooltipBasic
          side="bottom"
          align="end"
          label="Bottom end"
          style={{ gridColumn: "4", gridRow: "5" }}
        />

        <TooltipBasic
          side="left"
          align="start"
          label="Left start"
          style={{ gridColumn: "1", gridRow: "2" }}
        />
        <TooltipBasic
          side="left"
          align="center"
          label="Left center"
          style={{ gridColumn: "1", gridRow: "3" }}
        />
        <TooltipBasic
          side="left"
          align="end"
          label="Left end"
          style={{ gridColumn: "1", gridRow: "4" }}
        />
      </div>
    </div>
  );
};

export type TooltipBasicProps = TooltipInitialState & {
  style?: React.CSSProperties;
  label?: string;
};

export const TooltipBasic: React.FC<TooltipBasicProps> = props => {
  const { label, style, ...restProps } = props;
  const state = useTooltipState({
    sideOffset: 5,
    arrowOffset: 10,
    ...restProps,
  });

  return (
    <>
      <TooltipReference
        as="button"
        className="trigger"
        {...state}
        style={style}
      >
        {label}
      </TooltipReference>

      <Tooltip className="popover" {...state}>
        <TooltipContent {...state} className="content" animation={true}>
          <div>Tooltip</div>
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
