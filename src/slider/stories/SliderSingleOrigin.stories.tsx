import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleOriginJsx";
import ts from "./templates/SliderSingleOriginTsx";
import { SliderSingleOrigin } from "./SliderSingleOrigin.component";

type Meta = ComponentMeta<typeof SliderSingleOrigin>;
type Story = ComponentStoryObj<typeof SliderSingleOrigin>;

export default {
  component: SliderSingleOrigin,
  title: "Slider/SingleOrigin",
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: { minValue: -10, maxValue: +10, defaultValue: [0] },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const ThumbTip: Story = {
  args: {
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
    label: "Thumb Tipped",
    showTip: true,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
            label: "Thumb Tipped",
            showTip: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
            label: "Thumb Tipped",
            showTip: true,
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const MinMax: Story = {
  args: {
    defaultValue: [0],
    label: "Min Max",
    minValue: -20,
    maxValue: +20,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            defaultValue: [0],
            label: "Min Max",
            minValue: -20,
            maxValue: +20,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            defaultValue: [0],
            label: "Min Max",
            minValue: -20,
            maxValue: +20,
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
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
    label: "Stepped",
    step: 2,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
            label: "Stepped",
            step: 2,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
            label: "Stepped",
            step: 2,
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
    minValue: -10,
    maxValue: +10,
    label: "Default Valued",
    defaultValue: [-5],
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            label: "Default Valued",
            defaultValue: [-5],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            minValue: -10,
            maxValue: +10,
            label: "Default Valued",
            defaultValue: [-5],
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
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
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
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
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
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
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
    minValue: -10,
    maxValue: +10,
    defaultValue: [0],
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
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
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
            minValue: -10,
            maxValue: +10,
            defaultValue: [0],
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
