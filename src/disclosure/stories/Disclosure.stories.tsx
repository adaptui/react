import React from "react";
import { Meta } from "@storybook/react";
import {
  useDisclosureState,
  Disclosure,
  useDisclosure,
  DisclosureContent,
  useDisclosureContent,
} from "../index";

export default {
  title: "Component/Disclosure",
  component: Disclosure,
} as Meta;

export function Component() {
  const disclosure = useDisclosureState({ visible: true });
  return (
    <>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      <DisclosureContent {...disclosure}>Content</DisclosureContent>
    </>
  );
}

export function ConditionalRendering() {
  const disclosure = useDisclosureState();
  return (
    <>
      <Disclosure {...disclosure}>Toggle</Disclosure>
      {/* instead of {disclosure.visible && <DisclosureContent {...disclosure}>Content</DisclosureContent>} */}
      <DisclosureContent {...disclosure}>
        {props => disclosure.visible && <div {...props}>Content</div>}
      </DisclosureContent>
    </>
  );
}

export function MultipleComponents() {
  const disclosure1 = useDisclosureState();
  const disclosure2 = useDisclosureState();
  return (
    <>
      <Disclosure {...disclosure1}>
        {props => (
          <Disclosure {...props} {...disclosure2}>
            Toggle All
          </Disclosure>
        )}
      </Disclosure>
      <DisclosureContent {...disclosure1}>Content 1</DisclosureContent>
      <DisclosureContent {...disclosure2}>Content 2</DisclosureContent>
    </>
  );
}
