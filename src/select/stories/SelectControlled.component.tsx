import * as React from "react";

import {
  Select as RenderlesskitSelect,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "../../index";
import { fruits } from "./Utils.component";

export const Select = () => {
  const [fruit, setFruit] = React.useState<string | null>(null);

  return (
    <div>
      <h2>Uncontrolled</h2>
      <SelectComp values={fruits} defaultValue="Sapodilla" />
      <h2>Controlled</h2>
      <SelectComp values={fruits} value={fruit} onChange={setFruit} />
      <br />
      <br />
      <SelectComp values={fruits} value={fruit} onChange={setFruit} />
    </div>
  );
};

type SelectCompProps = SelectInitialState & {
  values?: string[];
  /**
   * The value to used in controlled mode
   */
  value?: string | null;
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: string | null;
  /**
   * The callback fired when the value changes
   */
  onChange?: (nextValue: string | null) => void;
};

const SelectComp: React.FC<SelectCompProps> = props => {
  const { values, defaultValue, value, onChange, ...rest } = props;

  const select = useSelectState({
    gutter: 8,
    selectedValue: props.defaultValue,
    ...rest,
  });

  React.useEffect(() => {
    if (value !== undefined) select.setSelectedValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.setSelectedValue, value]);

  React.useEffect(() => {
    onChange?.(select.selectedValue);
  }, [onChange, select.selectedValue]);

  return (
    <>
      <RenderlesskitSelect className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </RenderlesskitSelect>
      <SelectPopover {...select} aria-label="Fruits">
        {values?.length
          ? values.map(value => (
              <SelectOption {...select} key={value} value={value} />
            ))
          : "No results found"}
      </SelectPopover>
    </>
  );
};

export default Select;
