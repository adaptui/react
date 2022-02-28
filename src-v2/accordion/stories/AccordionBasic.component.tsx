import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionDisclosure,
  AccordionStateProps,
  useAccordionState,
} from "../../index";

export const AccordionBasic: React.FC<AccordionStateProps> = props => {
  const state = useAccordionState(props);

  return (
    <Accordion state={state}>
      <h2>
        <AccordionDisclosure>Trigger 1</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 1</AccordionContent>
      <h2>
        <AccordionDisclosure>Trigger 2</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 2</AccordionContent>
      <h2>
        <AccordionDisclosure id="accordion3">Trigger 3</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 3</AccordionContent>
      <h2>
        <AccordionDisclosure>Trigger 4</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 4</AccordionContent>
      <h2>
        <AccordionDisclosure>Trigger 5</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 5</AccordionContent>
      <h2>
        <AccordionDisclosure>Trigger 6</AccordionDisclosure>
      </h2>
      <AccordionContent>Panel 6</AccordionContent>
    </Accordion>
  );
};

export default AccordionBasic;
