import * as React from "react";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "renderless-components";

export const App: React.FC<SelectInitialState> = props => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const select = useSelectState({ gutter: 8, ...props });

  const onItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, value) => {
      event.preventDefault();
      if (!value) return;

      const index = selectedItems.indexOf(value);
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)]);
      } else {
        setSelectedItems([...selectedItems, value]);
      }
    },
    [selectedItems, setSelectedItems],
  );

  const buttonText = selectedItems.length
    ? `${selectedItems.length} fruits selected`
    : "Select a fruit";

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {buttonText}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        {fruits.length
          ? fruits.map(value => (
              <SelectOption
                {...select}
                key={value}
                value={value}
                onClick={e => onItemClick(e, value)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(value)}
                  value={value}
                  onChange={() => null}
                />
                <span />
                {value}
              </SelectOption>
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
