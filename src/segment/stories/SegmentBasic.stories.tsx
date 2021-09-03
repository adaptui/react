import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SegmentBasic.css";
import js from "./templates/SegmentBasicJsx";
import ts from "./templates/SegmentBasicTsx";
import css from "./templates/SegmentBasicCss";
import { Segment } from "./SegmentBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Segment,
  title: "Segment/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <Segment {...args} />;
Default.parameters = { options: { showPanel: true } };

export const Playground = () => (
  <div className="segment_demo">
    <pre>
      year: "numeric", month: "2-digit", day: "2-digit", weekday: "long",
    </pre>
    <Default
      formatOptions={{
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      }}
    />

    <pre>timeStyle: "long", dateStyle: "short"</pre>
    <Default
      formatOptions={{
        timeStyle: "long",
        dateStyle: "short",
      }}
    />

    <pre>timeStyle: "short", dateStyle: "long"</pre>
    <Default
      formatOptions={{
        timeStyle: "short",
        dateStyle: "long",
      }}
    />

    <pre>timeStyle: "full", dateStyle: "full"</pre>
    <Default
      formatOptions={{
        timeStyle: "full",
        dateStyle: "full",
      }}
    />
  </div>
);
Playground.parameters = { options: { showPanel: false } };
