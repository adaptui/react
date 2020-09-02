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

const AccordionComponent = (props: any) => {
  const state = useAccordionState(props);

  return (
    <Accordion {...state}>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem id="accordion-2" {...state}>
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

export const Default = () => <AccordionComponent />;
export const AllowMultiple = () => <AccordionComponent allowMultiple />;
export const LoopFalse = () => <AccordionComponent loop={false} />;
export const AllowToggleFalse = () => (
  <AccordionComponent allowToggle={false} />
);
export const DefaultActive = () => (
  <AccordionComponent defaultActiveId="accordion-2" />
);
export const ManualFalse = () => <AccordionComponent manual={false} />;
