import React from "react";
import { Meta } from "@storybook/react";

import { useAccordionState } from "../AccordionState";
import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import { AccordionTrigger } from "../AccordionTrigger";
import { AccordionPanel } from "../AccordionPanel";

export default {
  title: "Component/Accordion",
} as Meta;

export const Default = () => {
  const state = useAccordionState();

  return (
    <Accordion {...state}>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 3</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const AllowMultiple = () => {
  const state = useAccordionState({ allowMultiple: true });

  return (
    <Accordion {...state}>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 3</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
