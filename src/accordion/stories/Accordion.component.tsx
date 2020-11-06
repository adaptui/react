import * as React from "react";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
  AccordionInitialState,
} from "renderless-components";

export const App: React.FC<AccordionInitialState> = props => {
  const state = useAccordionState(props);

  // const initialProps = {
  //   selectedId: "accordion3",
  //   manual: true,
  //   loop: true,
  //   allowToggle: true,
  //   allowMultiple: true,
  //   selectedIds: [],
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
        <AccordionTrigger {...state}>Trigger 5</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 5</AccordionPanel>
    </Accordion>
  );
};

export default App;
