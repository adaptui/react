import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinkSpanJsx";
import ts from "./templates/LinkSpanTsx";
import { LinkSpan } from "./LinkSpan.component";

type Meta = ComponentMeta<typeof LinkSpan>;
type Story = ComponentStoryObj<typeof LinkSpan>;

export default {
  title: "Link/Span",
  component: LinkSpan,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {
  args: {
    children: "Timeless",
    onClick: event => goToLink(event, "https://timeless.co/"),
    onKeyDown: event => goToLink(event, "https://timeless.co/"),
  },
};

export const DisabledLink: Story = {
  args: {
    children: "Timeless",
    onClick: event => goToLink(event, "https://timeless.co/"),
    onKeyDown: event => goToLink(event, "https://timeless.co/"),
    disabled: true,
  },
};

function goToLink(event: React.MouseEvent | React.KeyboardEvent, url: string) {
  var type = event.type;

  // @ts-ignore
  if (type === "click" || (type === "keydown" && event.key === "Enter")) {
    window.location.href = url;

    event.preventDefault();
    event.stopPropagation();
  }
}
