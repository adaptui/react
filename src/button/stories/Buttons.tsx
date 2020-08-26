import React, { JSXElementConstructor, useState } from "react";
import { Button, AriaButton, AriaToggleButton } from "../index";
import { useToggleState } from "@react-stately/toggle";

export interface ButtonProps {
  /**
   * Button contents
   * @default Button
   */
  label: string;
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   * @default 'button'
   */
  as?: "button" | undefined;
  /** A URL to link to if elementType="a". */
  href?: string;
  /** The target window for the link. */
  target?: string;
  /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string;
  /**
   * Is button disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Is button focusable
   * @default false
   */
  focusable?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const ReakitButton: React.FC<ButtonProps> = ({
  label = "Button",
  ...props
}) => {
  return (
    <Button
      {...props}
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
      {label}
    </Button>
  );
};

export interface ReactAriaButtonProps {
  /**
   * Button contents
   *
   * @default Button
   */
  label: string;
  /**
   * The behavior of the button when used in an HTML form.
   * @default 'button'
   */
  type?: "button" | "submit" | "reset";
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   * @default 'button'
   */
  as?: "button" | undefined;
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   * @default 'button'
   */
  elementType?: string | JSXElementConstructor<any>;

  /** A URL to link to if elementType="a". */
  href?: string;
  /** The target window for the link. */
  target?: string;
  /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string;
  /**
   * Optional click handler
   */
  onPress?: () => void;
}

export const ReactAriaButton: React.FC<ReactAriaButtonProps> = ({
  label,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <AriaButton
      {...props}
      onPressChange={setIsPressed}
      style={{
        background: isPressed ? "darkgreen" : "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        border: "none",
      }}
    >
      button
    </AriaButton>
  );
};

export const ReactAriaToggleButton: React.FC<ReactAriaButtonProps> = ({
  label,
  ...props
}) => {
  const state = useToggleState();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <AriaToggleButton
      {...state}
      {...props}
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
      {label}
    </AriaToggleButton>
  );
};
