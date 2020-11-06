import React from "react";
import {
  Select,
  SelectMenu,
  SelectOption,
  SelectTrigger,
  useSelectState,
  SelectInitialState,
} from "renderless-components";

const countries = [
  { name: "australia", emoji: "🇦🇺" },
  { name: "russia", emoji: "🇷🇺" },
  { name: "new zealand", emoji: "🇳🇿" },
  { name: "india", emoji: "🇮🇳" },
  { name: "niger", emoji: "🇳🇪" },
  { name: "canada", emoji: "🇨🇦" },
  { name: "indonesia", emoji: "🇮🇩" },
  { name: "portugal", emoji: "🇵🇹" },
  { name: "norway", emoji: "🇳🇴" },
  { name: "switzerland", emoji: "🇨🇭" },
  { name: "africa", emoji: "🇨🇫" },
  { name: "colombia", emoji: "🇨🇴" },
  { name: "costa rica", emoji: "🇨🇷" },
  { name: "zimbabwe", emoji: "🇿🇼" },
];

export const App: React.FC<SelectInitialState> = props => {
  const state = useSelectState(props);

  return (
    <Select
      className="select"
      {...state}
      onChange={(value: any) => console.log(value)}
    >
      <SelectTrigger className="select__header" {...state}>
        <b style={{ color: state.isPlaceholder ? "#5d5b97" : "#33324d" }}>
          {state.isPlaceholder ? "Select one.." : state.selected.join(" ")}
        </b>
      </SelectTrigger>

      <SelectMenu
        {...state}
        className="select__dropdown"
        style={{ maxHeight: 200, overflowY: "scroll" }}
      >
        {countries.map(item => {
          return (
            <SelectOption
              className="select__dropdown--item"
              {...state}
              key={item.name}
              value={item.name}
            >
              {item.emoji} - {item.name}
            </SelectOption>
          );
        })}
      </SelectMenu>
    </Select>
  );
};

export default App;
