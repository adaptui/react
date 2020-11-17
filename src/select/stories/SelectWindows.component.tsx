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

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      event.preventDefault();

      // setTimeout on show prevents scroll jump on ArrowUp & ArrowDown
      const first = () => {
        if (!select.visible) select.show && setTimeout(select.show);
        if (!select.selectedValue) select.first?.();
      };

      const selectPrevValue = () => {
        if (select.selectedValue == null) {
          select.setSelectedValue(select.values[select.values.length - 1]);
          return;
        }

        const currentIndex = select.values.indexOf(select.selectedValue);
        const nextValue = select.values[currentIndex - 1];
        select.setSelectedValue(nextValue);
      };

      const selectNextValue = () => {
        if (select.selectedValue == null) {
          select.setSelectedValue(select.values[0]);
          return;
        }

        const currentIndex = select.values.indexOf(select.selectedValue);
        const nextValue = select.values[currentIndex + 1];
        select.setSelectedValue(nextValue);
      };

      const keyMap = {
        Enter: first,
        " ": first,
        ArrowUp: selectPrevValue,
        ArrowDown: selectNextValue,
      };

      const action = keyMap[event.key as keyof typeof keyMap];
      if (action) action();
    },
    [
      select.values,
      select.visible,
      select.show,
      select.first,
      select.selectedValue,
      select.setSelectedValue,
    ],
  );

  return (
    <>
      <h2>Press up & down on the button to change the value directly</h2>
      <Select
        className="select"
        onKeyDown={onKeyDown}
        aria-label="Fruit"
        {...select}
      >
        {select.selectedValue || "Select a fruit"}
      </Select>
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
