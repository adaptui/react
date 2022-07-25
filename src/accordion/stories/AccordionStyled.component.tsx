import * as React from "react";

import {
  Accordion,
  AccordionDisclosure,
  AccordionPanel,
  AccordionStateProps,
  useAccordionState,
} from "../../index";

export type AccordionStyledProps = AccordionStateProps;

// Styled based on https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html
export const AccordionStyled: React.FC<AccordionStyledProps> = props => {
  const state = useAccordionState(props);

  return (
    <Accordion state={state} className="accordion">
      <h2>
        <AccordionDisclosure className="accordion-trigger">
          <span className="accordion-title">
            Personal Information
            <span className="accordion-icon"></span>
          </span>
        </AccordionDisclosure>
      </h2>
      <AccordionPanel className="accordion-panel">
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
        <AccordionDisclosure className="accordion-trigger">
          <span className="accordion-title">
            Billing Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionDisclosure>
      </h2>
      <AccordionPanel className="accordion-panel">
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
        <AccordionDisclosure className="accordion-trigger">
          <span className="accordion-title">
            Shipping Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionDisclosure>
      </h2>
      <AccordionPanel className="accordion-panel">
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

export default AccordionStyled;
