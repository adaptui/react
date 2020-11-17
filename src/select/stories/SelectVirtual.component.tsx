import * as React from "react";
import { useVirtual } from "react-virtual";

import {
  SelectInitialState,
  useSelectState,
  Select,
  SelectPopover,
  SelectOption,
} from "renderless-components";

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, values: fruits, ...props });

  const listRef = React.useRef();
  const rowVirtualizer = useVirtual({
    size: fruits.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 30, []),
  });

  // React.useEffect(() => {
  //   if (!select.currentValue) return;
  //   console.log(fruits.indexOf(select.currentValue));
  //   rowVirtualizer.scrollToIndex(fruits.indexOf(select.currentValue));
  // }, [select.currentValue, rowVirtualizer]);

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover
        {...select}
        aria-label="Fruits"
        ref={listRef}
        style={{
          height: `150px`,
          width: `300px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <SelectOption
              {...select}
              key={virtualRow.index}
              value={`${fruits[virtualRow.index]}`}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {fruits[virtualRow.index]}
            </SelectOption>
          ))}
        </div>
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
