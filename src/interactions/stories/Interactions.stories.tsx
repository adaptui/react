import { Meta } from "@storybook/react";
import React, { FocusEvent, KeyboardEvent } from "react";

import { Press } from "../Press";
import { Focus } from "../Focus";
import { Keyboard } from "../Keyboard";
import { FocusWithin } from "../FocusWithin";
import { FocusVisible } from "../FocusVisible";
import { Hover } from "../Hover";

export default {
  title: "Component/Interactions",
} as Meta;

export const Default = () => {
  const [events, setEvents] = React.useState<string[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFocusedVisible, setIsFocusedVisible] = React.useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isKeyDown, setIsKeyDown] = React.useState<boolean>(false);
  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  return (
    <>
      <FocusWithin
        onFocusWithinChange={setIsFocusedWithin}
        onFocusWithin={e => setEvents(events => [...events, "focus within"])}
        onBlurWithin={e => setEvents(events => [...events, "blur within"])}
        style={{
          display: "inline-block",
          border: "1px solid gray",
          padding: 10,
          background: isFocusedWithin ? "tomato" : "",
        }}
      >
        <Focus
          as="button"
          onFocus={(e: FocusEvent) => setEvents(events => [...events, "focus"])}
          onBlur={(e: FocusEvent) => setEvents(events => [...events, "blur"])}
          onFocusChange={setIsFocused}
        >
          {`isFocused: ${isFocused}`}
        </Focus>
        <hr />
        <FocusVisible
          as="button"
          onFocusVisibleChange={setIsFocusedVisible}
        >{`isFocusedVisible: ${isFocusedVisible}`}</FocusVisible>
        <hr />
        <Hover
          as="button"
          onHoverStart={e =>
            setEvents(events => [
              ...events,
              `hover start with ${e.pointerType}`,
            ])
          }
          onHoverEnd={e =>
            setEvents(events => [...events, `hover end with ${e.pointerType}`])
          }
          onHoverChange={setIsHovered}
        >{`isHovered: ${isHovered}`}</Hover>
        <hr />
        <Keyboard
          as="button"
          onKeyDown={(e: KeyboardEvent) => {
            setEvents(events => [...events, `key down: ${e.key}`]);
            setIsKeyDown(true);
          }}
          onKeyUp={(e: KeyboardEvent) => {
            setEvents(events => [...events, `key up: ${e.key}`]);
            setIsKeyDown(false);
          }}
        >{`isKeyDown: ${isKeyDown}`}</Keyboard>
      </FocusWithin>
      <hr />
      <Press
        as="button"
        onPressChange={setIsPressed}
        onPress={e =>
          setEvents(events => [...events, `on press with ${e.pointerType}`])
        }
        onPressStart={e =>
          setEvents(events => [...events, `press start with ${e.pointerType}`])
        }
        onPressEnd={e =>
          setEvents(events => [...events, `press end with ${e.pointerType}`])
        }
        onPressUp={e =>
          setEvents(events => [...events, `press up with ${e.pointerType}`])
        }
      >
        {`isPressed: ${isPressed}`}
      </Press>
      <hr />
      <ul
        style={{
          maxHeight: "200px",
          overflow: "auto",
        }}
      >
        {events.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </>
  );
};
