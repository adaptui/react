import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/MeterBasicCss";
import js from "./templates/MeterBasicJsx";
import ts from "./templates/MeterBasicTsx";
import MeterBasic from "./MeterBasic.component";

import "./MeterBasic.css";

type Meta = ComponentMeta<typeof MeterBasic>;
type Story = ComponentStoryObj<typeof MeterBasic>;

export default {
  title: "Meter/Basic",
  component: MeterBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    low: 0,
    high: 10,
    optimum: 5,
  },
};

// Examples from https://css-tricks.com/html5-meter-element/
export const AllUseCases = () => {
  return (
    <div>
      <h4>Case 1 - No attributes</h4>
      <div>
        <kbd>{`<Meter />`}</kbd>
      </div>
      <br />
      <MeterBasic />
      <br />
      <h4>{`Case 2 - value < max (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.5} />
      <br />
      <h4>{`Case 3 - value = max (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={1} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={1} />
      <br />
      <h4>{`Case 4 - value > max (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={5} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={5} />
      <br />
      <h4>{`Case 6 - value = min (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0} />
      <br />
      <h4>{`Case 7 - value > min (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.5} />
      <br />
      <h4>{`Case 8 - value < high (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.5}  high={0.8} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.5} high={0.8} />
      <br />
      <h4>{`Case 9 - value = high (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.8}  high={0.8} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.8} high={0.8} />
      <br />
      <h4>{`Case 10 - value > high (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.9}  high={0.8} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.9} high={0.8} />
      <br />
      <h4>{`Case 11 - value < low (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.15} low={0.25} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.15} low={0.25} />
      <br />
      <h4>{`Case 12 - value = low (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.25} low={0.25} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.25} low={0.25} />
      <br />
      <h4>{`Case 13 - value > low (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter value={0.5} low={0.25} />`}</kbd>
      </div>
      <br />
      <MeterBasic value={0.5} low={0.25} />
      <br />
      <h4>{`Case 14 - optimum < low < high (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter low={0.25} optimum={0.15} high={0.75} value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic low={0.25} optimum={0.15} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 15 - low < optimum < high (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter low={0.25} optimum={0.5} high={0.75} value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic low={0.25} optimum={0.5} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 16 - low < high < optimum (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter low={0.25} optimum={0.85} high={0.75} value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic low={0.25} optimum={0.85} high={0.75} value={0.5} />
      <br />
      <h4>{`Case 17 - value < low < high < optimum (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter low={0.25} optimum={0.8} high={0.75} value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic low={0.25} optimum={0.8} high={0.75} value={0.2} />
      <br />
      <h4>{`Case 18 - value > high > low > optimum (default: min=0, max=1)`}</h4>
      <div>
        <kbd>{`<Meter low={0.25} optimum={0.2} high={0.75} value={0.5} />`}</kbd>
      </div>
      <br />
      <MeterBasic low={0.25} optimum={0.2} high={0.75} value={0.8} />
    </div>
  );
};
