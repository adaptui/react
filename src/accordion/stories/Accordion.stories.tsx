import React from "react";
import { Meta } from "@storybook/react";

import "./index.css";
import { AccordionItem } from "../AccordionItem";
import { AccordionPanel } from "../AccordionPanel";
import { useAccordionState } from "../AccordionState";
import { AccordionTrigger } from "../AccordionTrigger";

export default {
  title: "Component/Accordion",
} as Meta;

const AccordionComponent = (props: any) => {
  const state = useAccordionState(props);

  return (
    <div>
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
        <AccordionPanel {...state}>
          {props => {
            const { hidden, ...rest } = props;
            return <div {...rest}>{!hidden ? "Panel 2" : null}</div>;
          }}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="accordion-3" {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>
          {props => {
            const { hidden, ...rest } = props;
            const isOpen = state.activeItems.includes("accordion-3");
            return (
              <div {...rest} hidden={!isOpen}>
                {isOpen ? "Panel 3" : null}
              </div>
            );
          }}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem isOpen={props.alwaysOpen} {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 4</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 4</AccordionPanel>
      </AccordionItem>
      <AccordionItem id="accordion-5" {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 5</AccordionTrigger>
        </h3>
        {state.activeItems.includes("accordion-5") && (
          <AccordionPanel {...state}>Panel 5</AccordionPanel>
        )}
      </AccordionItem>
    </div>
  );
};

export const Default = () => <AccordionComponent />;
export const AllowMultiple = () => <AccordionComponent allowMultiple />;
export const LoopFalse = () => <AccordionComponent loop={false} />;
export const AllowToggleFalse = () => (
  <AccordionComponent allowToggle={false} />
);
export const DefaultActive = () => (
  <AccordionComponent defaultActiveId="accordion-3" />
);
export const ManualFalse = () => <AccordionComponent manual={false} />;
export const AlwaysOpen = () => <AccordionComponent alwaysOpen={true} />;

// Styled based on https://www.w3.org/TR/wai-aria-practices-1.2/examples/accordion/accordion.html
export const Styled = () => {
  const props = useAccordionState({ allowMultiple: false });

  return (
    <div id="accordionGroup" className="accordion">
      <AccordionItem {...props}>
        <h3>
          <AccordionTrigger {...props} className="accordion-trigger">
            <span className="accordion-title">
              Personal Information
              <span className="accordion-icon"></span>
            </span>
          </AccordionTrigger>
        </h3>
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
                <input
                  type="text"
                  name="Email"
                  id="cufc2"
                  aria-required="true"
                />
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
      </AccordionItem>
      <AccordionItem {...props}>
        <h3>
          <AccordionTrigger {...props} className="accordion-trigger">
            <span className="accordion-title">
              Billing Address
              <span className="accordion-icon"></span>
            </span>
          </AccordionTrigger>
        </h3>
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
      </AccordionItem>
      <AccordionItem {...props}>
        <h3>
          <AccordionTrigger {...props} className="accordion-trigger">
            <span className="accordion-title">
              Shipping Address
              <span className="accordion-icon"></span>
            </span>
          </AccordionTrigger>
        </h3>
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
      </AccordionItem>
    </div>
  );
};
