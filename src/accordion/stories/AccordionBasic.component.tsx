import * as React from "react";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "../index";

export function App(props: any) {
  const state = useAccordionState(props);

  // const initialProps = {
  //   defaultSelectedId: "accordion3",
  //   manual: true,
  //   loop: true,
  //   allowToggle: true,
  // };

  // const state = useAccordionState(initialProps);

  return (
    <Accordion {...state}>
      <h2>
        <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 1</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 2</AccordionPanel>
      <h2>
        <AccordionTrigger {...state} id="accordion3">
          Trigger 3
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 3</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 4</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 4</AccordionPanel>
      <h2>
        <AccordionTrigger {...state} disabled>
          Trigger 5
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 5</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 6</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 6</AccordionPanel>
    </Accordion>
  );
}

export default App;
