import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import js from "./templates/MeterStyledJsx";
import ts from "./templates/MeterStyledTsx";
import { MeterBasic } from "./MeterStyled.component";

type Meta = ComponentMeta<typeof MeterBasic>;
type Story = ComponentStoryObj<typeof MeterBasic>;

export default {
  component: MeterBasic,
  title: "Meter/Styled",
} as Meta;

const Default: Story = {
  args: { value: 5, min: 0, max: 10, low: 0, high: 10, optimum: 5 },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            value: 5,
            min: 0,
            max: 10,
            low: 0,
            high: 10,
            optimum: 5,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.js": CreateAppTemplate({
            value: 5,
            min: 0,
            max: 10,
            low: 0,
            high: 10,
            optimum: 5,
          }),
        },
      },
      deps: ["@emotion/css@latest"],
    }),
  },
};

export const WithLabel = {
  args: { ...Default.args, withLabel: true },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({ ...Default.args, withLabel: true }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            ...Default.args,
            withLabel: true,
          }),
        },
      },
      deps: ["@emotion/css@latest"],
    }),
  },
};

export const WithStripe = {
  args: { ...Default.args, withStripe: true },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            ...Default.args,
            withStripe: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            ...Default.args,
            withStripe: true,
          }),
        },
      },
      deps: ["@emotion/css@latest"],
    }),
  },
};

export const WithStripeAnimation = {
  args: { ...Default.args, withStripe: true, withStripeAnimation: true },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            ...Default.args,
            withStripe: true,
            withStripeAnimation: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            ...Default.args,
            withStripe: true,
            withStripeAnimation: true,
          }),
        },
      },
      deps: ["@emotion/css@latest"],
    }),
  },
};
