import React from "react";
import { Meta } from "@storybook/react";

import "./index.css";
import {
  useAccordionState,
  Accordion,
  AccordionTrigger,
  AccordionPanel,
  AccordionInitialState,
} from "../index";

export default {
  title: "Component/Accordion",
} as Meta;

const AccordionComponent: React.FC<AccordionInitialState> = props => {
  const state = useAccordionState(props);

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

export const Default = () => <AccordionComponent />;

export const DefaultSelected = () => (
  <AccordionComponent selectedId="accordion3" />
);

export const AutoSelect = () => <AccordionComponent manual={false} />;

export const Loop = () => <AccordionComponent loop />;

export const AllowToggle = () => <AccordionComponent allowToggle />;

export const AllowMultiple = () => <AccordionComponent allowMultiple />;

// Styled based on https://www.w3.org/TR/wai-aria-practices-1.2/examples/accordion/accordion.html
export const Styled = () => {
  const props = useAccordionState();

  return (
    <Accordion {...props} id="accordionGroup" className="accordion">
      <h2>
        <AccordionTrigger {...props} className="accordion-trigger">
          <span className="accordion-title">
            Personal Information
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...props} className="accordion-panel">
        <div>
          <fieldset>
            <p>
              <label htmlFor="cufc1">
                Name
                <span aria-hidden="true">*</span>:
              </label>
              <input
                type="text"
                name="Name"
                id="cufc1"
                className="required"
                aria-required="true"
              />
            </p>
            <p>
              <label htmlFor="cufc2">
                Email
                <span aria-hidden="true">*</span>:
              </label>
              <input type="text" name="Email" id="cufc2" aria-required="true" />
            </p>
            <p>
              <label htmlFor="cufc3">Phone:</label>
              <input type="text" name="Phone" id="cufc3" />
            </p>
            <p>
              <label htmlFor="cufc4">Extension:</label>
              <input type="text" name="Ext" id="cufc4" />
            </p>
            <p>
              <label htmlFor="cufc5">Country:</label>
              <input type="text" name="Country" id="cufc5" />
            </p>
            <p>
              <label htmlFor="cufc6">City/Province:</label>
              <input type="text" name="City_Province" id="cufc6" />
            </p>
          </fieldset>
        </div>
      </AccordionPanel>

      <h2>
        <AccordionTrigger {...props} className="accordion-trigger">
          <span className="accordion-title">
            Billing Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...props} className="accordion-panel">
        <div>
          <fieldset>
            <p>
              <label htmlFor="b-add1">Address 1:</label>
              <input type="text" name="b-add1" id="b-add1" />
            </p>
            <p>
              <label htmlFor="b-add2">Address 2:</label>
              <input type="text" name="b-add2" id="b-add2" />
            </p>
            <p>
              <label htmlFor="b-city">City:</label>
              <input type="text" name="b-city" id="b-city" />
            </p>
            <p>
              <label htmlFor="b-state">State:</label>
              <input type="text" name="b-state" id="b-state" />
            </p>
            <p>
              <label htmlFor="b-zip">Zip Code:</label>
              <input type="text" name="b-zip" id="b-zip" />
            </p>
          </fieldset>
        </div>
      </AccordionPanel>

      <h2>
        <AccordionTrigger {...props} className="accordion-trigger">
          <span className="accordion-title">
            Shipping Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...props} className="accordion-panel">
        <div>
          <fieldset>
            <p>
              <label htmlFor="m-add1">Address 1:</label>
              <input type="text" name="m-add1" id="m-add1" />
            </p>
            <p>
              <label htmlFor="m-add2">Address 2:</label>
              <input type="text" name="m-add2" id="m-add2" />
            </p>
            <p>
              <label htmlFor="m-city">City:</label>
              <input type="text" name="m-city" id="m-city" />
            </p>
            <p>
              <label htmlFor="m-state">State:</label>
              <input type="text" name="m-state" id="m-state" />
            </p>
            <p>
              <label htmlFor="m-zip">Zip Code:</label>
              <input type="text" name="m-zip" id="m-zip" />
            </p>
          </fieldset>
        </div>
      </AccordionPanel>
    </Accordion>
  );
};
