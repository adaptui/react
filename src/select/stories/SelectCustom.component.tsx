import * as React from "react";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "renderless-components";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <h2>Hover over the button to open the options</h2>
      <Select
        className="select"
        {...select}
        onMouseEnter={() => select.show()}
        aria-label="Fruit"
      >
        {select.selectedValue || "Select a fruit"}
      </Select>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          select.setSelectedValue(null);
        }}
        aria-label="clear selection"
      >
        &#215;
      </button>
      <SelectPopover {...select} aria-label="Fruits">
        {fruits.length
          ? fruits.map(value => (
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
