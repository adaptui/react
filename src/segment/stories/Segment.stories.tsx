import "./Segment.css";
import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { App as Segment } from "./Segment.component";
import { appTemplate, appTemplateJs, cssTemplate } from "./templates";

export default {
  component: Segment,
  title: "Segment",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
    ],
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
