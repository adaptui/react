import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import js from "./templates/SliderAllInOneJsx";
import ts from "./templates/SliderAllInOneTsx";
import css from "./templates/SliderBasicCss";
import { SliderAllInOne } from "./SliderAllInOne.component";

type Meta = ComponentMeta<typeof SliderAllInOne>;
type Story = ComponentStoryObj<typeof SliderAllInOne>;

export default {
  title: "Slider/AllInOne",
  component: SliderAllInOne,
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
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const ThumbTip: Story = {
  args: {
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

export const Origin: Story = {
  args: {
    label: "Origin Changed",
    showTip: true,
    defaultValue: [0],
    origin: 0,
    minValue: -50,
    maxValue: 50,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Origin Changed",
            showTip: true,
            defaultValue: [0],
            origin: 0,
            minValue: -50,
            maxValue: 50,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Origin Changed",
            showTip: true,
            defaultValue: [0],
            origin: 0,
            minValue: -50,
            maxValue: 50,
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

export const Range: Story = {
  args: {
    label: "Range",
    defaultValue: [25, 75],
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Range",
            defaultValue: [25, 75],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Range",
            defaultValue: [25, 75],
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const Multi: Story = {
  args: {
    label: "Range",
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
            label: "Range",
            defaultValue: [25, 50, 75],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Range",
            defaultValue: [25, 50, 75],
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};

export const Multis: Story = {
  args: {
    label: "Range",
    defaultValue: [0, 20, 40, 60, 80, 100],
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.js": CreateAppTemplate({
            label: "Range",
            defaultValue: [0, 20, 40, 60, 80, 100],
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/SliderBasic.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "Range",
            defaultValue: [0, 20, 40, 60, 80, 100],
          }),
        },
      },
      css,
    }),
    options: { showPanel: true },
  },
};
