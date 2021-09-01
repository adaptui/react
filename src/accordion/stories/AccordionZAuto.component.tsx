import * as React from "react";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "../index";

export function App(props: any) {
  const initialProps = {
    defaultSelectedId: "accordion3",
    manual: true,
    loop: true,
    allowToggle: true,
  };

  const state = useAccordionState(initialProps || props);

  const [text, setText] = React.useState("Start Tutorial");

  let stateRef = React.useRef(state);
  stateRef.current = state;

  const runTutorial = async () => {
    stateRef.current.first();
    stateRef.current.currentId != null &&
      stateRef.current.setSelectedId(stateRef.current.currentId);
    setText("Moved to First Accordion & opened it");
    await sleep(3000);

    stateRef.current.currentId != null && stateRef.current.select("accordion3");
    setText("Selected Accordion 3");
    await sleep(3000);

    stateRef.current.next();
    stateRef.current.currentId != null &&
      stateRef.current.setSelectedId(stateRef.current.currentId);
    setText("Moved to Next Accordion & opened it");
    await sleep(3000);

    stateRef.current.previous();
    setText("Moved to Previous Accordion");
    await sleep(1500);

    stateRef.current.previous();
    stateRef.current.currentId != null &&
      stateRef.current.setSelectedId(stateRef.current.currentId);
    setText("Moved to Previous Accordion once more & opened it");
    await sleep(3000);

    stateRef.current.currentId != null && stateRef.current.select("accordion6");
    setText("Selected Accordion 6");
    await sleep(3000);
  };

  return (
    <div>
      <button onClick={runTutorial} style={{ width: "500px" }}>
        {text}
      </button>
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
          <AccordionTrigger {...state} id="accordion6">
            Trigger 6
          </AccordionTrigger>
        </h2>
        <AccordionPanel {...state}>Panel 6</AccordionPanel>
      </Accordion>
    </div>
  );
}

export default App;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
