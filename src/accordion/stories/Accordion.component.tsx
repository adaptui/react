import * as React from "react";

import {
  useAccordionState,
  Accordion,
  AccordionTrigger,
  AccordionPanel,
  AccordionState,
  // @ts-ignore
} from "renderless-components";

export interface AppProps {
  /**
   * The current selected accordion's `id`.
   */
  selectedId?: AccordionState["currentId"];
  /**
   * Initial selected accordion's `id`.
   * @default []
   */
  selectedIds?: AccordionState["currentId"][];
  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual?: boolean;
  /**
   * Whether to loop through the accordion triggers
   * @default false
   */
  loop?: boolean;
  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle?: boolean;
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: boolean;
}

export const App: React.FC<AppProps> = props => {
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
