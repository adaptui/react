import * as React from "react";

import {
  Accordion,
  AccordionDisclosure,
  AccordionPanel,
  AccordionStateProps,
  useAccordionState,
} from "../../index";

export type AccordionBasicProps = AccordionStateProps;

export const AccordionBasic: React.FC<AccordionBasicProps> = props => {
  const state = useAccordionState(props);

  return (
    <Accordion state={state}>
      <h2>
        <AccordionDisclosure id="Trigger 1">Trigger 1</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 1">Panel 1</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 2">Trigger 2</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 2">Panel 2</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 3">Trigger 3</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 3">Panel 3</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 4">Trigger 4</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 4">Panel 4</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 5">Trigger 5</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 5">Panel 5</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 6">Trigger 6</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 6">Panel 6</AccordionPanel>
    </Accordion>
  );
};

export default AccordionBasic;
