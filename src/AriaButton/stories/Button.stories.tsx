import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { Button, AriaButton, AriaToggleButton } from "../index";
import { useToggleState } from "@react-stately/toggle";

export default {
  title: "Component/Button",
} as Meta;

export const ReakitButton = () => {
  return (
    <Button
      onClick={() => alert("Button Pressed")}
      style={{
        background: "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        border: "none",
      }}
    >
      button
    </Button>
  );
};

export const ReactAriaButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <AriaButton
      as="span"
      elementType="span"
      onPress={() => alert("Button Pressed")}
      onPressChange={setIsPressed}
      style={{
        background: isPressed ? "darkgreen" : "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      button
    </AriaButton>
  );
};

export const ReactAriaToggleButton = () => {
  const state = useToggleState();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <AriaToggleButton
      {...state}
      onPressChange={setIsPressed}
      style={{
        background: isPressed
          ? state.isSelected
            ? "darkblue"
            : "darkgreen"
          : state.isSelected
          ? "blue"
          : "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        border: "none",
      }}
    >
      button
    </AriaToggleButton>
  );
};
