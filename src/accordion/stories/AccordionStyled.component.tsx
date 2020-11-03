import * as React from "react";

import {
  useAccordionState,
  Accordion,
  AccordionTrigger,
  AccordionPanel,
  AccordionState,
  // @ts-ignore
} from "renderless-components";

interface AppProps {
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
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle?: boolean;
}

// Styled based on https://www.w3.org/TR/wai-aria-practices-1.2/examples/accordion/accordion.html
export const App: React.FC<AppProps> = props => {
  const state = useAccordionState(props);

  // const initialProps = {
  //   selectedId: "accordion2",
  //   manual: false,
  //   loop: true,
  //   allowToggle: true,
  //   allowMultiple: true,
  //   selectedIds: [],
  // };

  // const state = useAccordionState(initialProps);

  return (
    <Accordion {...state} id="accordionGroup" className="accordion">
      <h2>
        <AccordionTrigger {...state} className="accordion-trigger">
          <span className="accordion-title">
            Personal Information
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state} className="accordion-panel">
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
        <AccordionTrigger
          {...state}
          className="accordion-trigger"
          id="accordion2"
        >
          <span className="accordion-title">
            Billing Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state} className="accordion-panel">
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
        <AccordionTrigger {...state} className="accordion-trigger">
          <span className="accordion-title">
            Shipping Address
            <span className="accordion-icon"></span>
          </span>
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state} className="accordion-panel">
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

export default App;
