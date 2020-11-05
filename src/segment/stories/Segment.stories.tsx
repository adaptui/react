import "./Segment.css";
import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Segment } from "./Segment.component";
import {
  segmentTemplate,
  segmentTemplateJs,
  segmentCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Segment,
  title: "Segment",
  parameters: {
    preview: {
      preview: createPreviewTabs({
        ts: segmentTemplate,
        js: segmentTemplateJs,
        css: segmentCssTemplate,
      }),
    },
  },
} as Meta;

const Base: Story = args => <Segment {...args} />;

export const Default = () => (
  <div className="segment_demo">
    <pre>
      year: "numeric", month: "2-digit", day: "2-digit", weekday: "long",
    </pre>
    <Base
      formatOptions={{
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      }}
    />

    <pre>timeStyle: "long", dateStyle: "short"</pre>
    <Base
      formatOptions={{
        timeStyle: "long",
        dateStyle: "short",
      }}
    />

    <pre>timeStyle: "short", dateStyle: "long"</pre>
    <Base
      formatOptions={{
        timeStyle: "short",
        dateStyle: "long",
      }}
    />

    <pre>timeStyle: "full", dateStyle: "full"</pre>
    <Base
      formatOptions={{
        timeStyle: "full",
        dateStyle: "full",
      }}
    />
  </div>
);
