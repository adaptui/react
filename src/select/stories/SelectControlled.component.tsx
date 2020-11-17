import * as React from "react";
import { isUndefined } from "@chakra-ui/utils";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "renderless-components";

export const App: React.FC = () => {
  const [fruit, setFruit] = React.useState<string | null>(null);

  return (
    <div>
      <h2>Uncontrolled</h2>
      <SelectComp values={fruits} defaultValue="Sapodilla" />
      <h2>Controlled</h2>
      <SelectComp values={fruits} value={fruit} onChange={setFruit} />
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
    if (!isUndefined(value)) select.setSelectedValue(value);
  }, [select.setSelectedValue, value]);

  React.useEffect(() => {
    onChange?.(select.selectedValue);
  }, [onChange, select.selectedValue]);

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
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

export default App;

const fruits = [
  "Acerola",
  "Apple",
  "Apricots",
  "Avocado",
  "Banana",
  "Blackberries",
  "Blackcurrant",
  "Blueberries",
  "Breadfruit",
  "Cantaloupe",
  "Carambola",
  "Cherimoya",
  "Cherries",
  "Clementine",
  "Coconut Meat",
  "Cranberries",
  "Custard-Apple",
  "Date Fruit",
  "Durian",
  "Elderberries",
  "Feijoa",
  "Figs",
  "Gooseberries",
  "Grapefruit",
  "Grapes",
  "Guava",
  "Honeydew Melon",
  "Jackfruit",
  "Java-Plum",
  "Jujube Fruit",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Longan",
  "Loquat",
  "Lychee",
  "Mandarin",
  "Mango",
  "Mangosteen",
  "Mulberries",
  "Nectarine",
  "Olives",
  "Orange",
  "Papaya",
  "Passion Fruit",
  "Peaches",
  "Pear",
  "Persimmon",
  "Pitaya",
  "Pineapple",
  "Pitanga",
  "Plantain",
  "Plums",
  "Pomegranate",
  "Prickly Pear",
  "Prunes",
  "Pummelo",
  "Quince",
  "Raspberries",
  "Rhubarb",
  "Rose-Apple",
  "Sapodilla",
  "Soursop",
  "Strawberries",
  "Sugar-Apple",
  "Tamarind",
  "Tangerine",
  "Watermelon",
];
