import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/MeterStyledJsx";
import ts from "./templates/MeterStyledTsx";
import { MeterStyled } from "./MeterStyled.component";

type Meta = ComponentMeta<typeof MeterStyled>;
type Story = ComponentStoryObj<typeof MeterStyled>;

export default {
  component: MeterStyled,
  title: "Meter/Styled",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, deps: ["@emotion/css@latest"] }),
  },
} as Meta;

const Default: Story = {
  args: { value: 5, min: 0, max: 10, low: 0, high: 10, optimum: 5 },
};

export const WithLabel = { args: { ...Default.args, withLabel: true } };

export const WithStripe = { args: { ...Default.args, withStripe: true } };

export const WithStripeAnimation = {
  args: { ...Default.args, withStripe: true, withStripeAnimation: true },
};
