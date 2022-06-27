import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderMultiJsx";
import ts from "./templates/SliderMultiTsx";
import { SliderMulti } from "./SliderMulti.component";

type Meta = ComponentMeta<typeof SliderMulti>;
type Story = ComponentStoryObj<typeof SliderMulti>;

export default {
  title: "Slider/Multi",
  component: SliderMulti,
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: {
    defaultValue: [25, 50, 75],
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            defaultValue: [25, 50, 75],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            defaultValue: [25, 50, 75],
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
    defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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

export const Vertical: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Vertical",
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
            defaultValue: [25, 50, 75],
            label: "Vertical",
            orientation: "vertical",
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            defaultValue: [25, 50, 75],
            label: "Vertical",
            orientation: "vertical",
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
    defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
    defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
    defaultValue: [10, 20, 30],
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
            defaultValue: [10, 20, 30],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Default Valued",
            defaultValue: [10, 20, 30],
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
    defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
            defaultValue: [25, 50, 75],
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
