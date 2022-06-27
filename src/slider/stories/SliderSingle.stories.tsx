import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleJsx";
import ts from "./templates/SliderSingleTsx";
import { SliderSingle } from "./SliderSingle.component";

type Meta = ComponentMeta<typeof SliderSingle>;
type Story = ComponentStoryObj<typeof SliderSingle>;

export default {
  component: SliderSingle,
  title: "Slider/Single",
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: {},
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({}),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({}),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const MinMax: Story = {
  args: {
    label: "Min Max",
    minValue: 20,
    maxValue: 80,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Min Max",
            minValue: 20,
            maxValue: 80,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Min Max",
            minValue: 20,
            maxValue: 80,
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const Step: Story = {
  args: {
    label: "Stepped",
    step: 10,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Stepped",
            step: 10,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Stepped",
            step: 10,
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Default Valued",
    defaultValue: [80],
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Default Valued",
            defaultValue: [80],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Default Valued",
            defaultValue: [80],
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const FormatOptions: Story = {
  args: {
    label: "Temperature Formatted",
    formatOptions: {
      style: "unit",
      unit: "celsius",
      unitDisplay: "narrow",
    },
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Temperature Formatted",
            formatOptions: {
              style: "unit",
              unit: "celsius",
              unitDisplay: "narrow",
            },
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Temperature Formatted",
            formatOptions: {
              style: "unit",
              unit: "celsius",
              unitDisplay: "narrow",
            },
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    isDisabled: true,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Disabled",
            isDisabled: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Disabled",
            isDisabled: true,
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};
