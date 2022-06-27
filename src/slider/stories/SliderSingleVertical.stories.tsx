import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderSingleVerticalJsx";
import ts from "./templates/SliderSingleVerticalTsx";
import { SliderSingleVertical } from "./SliderSingleVertical.component";

type Meta = ComponentMeta<typeof SliderSingleVertical>;
type Story = ComponentStoryObj<typeof SliderSingleVertical>;

export default {
  component: SliderSingleVertical,
  title: "Slider/SingleVertical",
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: {
    orientation: "vertical",
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            orientation: "vertical",
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
    orientation: "vertical",
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
            orientation: "vertical",
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
            orientation: "vertical",
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
