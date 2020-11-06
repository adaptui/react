import React from "react";
import {
  Select,
  SelectMenu,
  SelectInput,
  SelectOption,
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
  const state = useSelectState({
    ...props,
    allowMultiselect: true,
    selected: "india",
    isCombobox: true,
  });

  return (
    <Select
      {...state}
      className="select"
      onChange={(value: any) => console.log(value)}
    >
      <div className="select__header">
        {state.selected.map(item => (
          <span className="select__chip">
            <span> {item}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                state.removeSelected(item);
              }}
            >
              x
            </button>
          </span>
        ))}
        <SelectInput
          className="select__input"
          placeholder={state.isPlaceholder ? "Select.." : ""}
          {...state}
        ></SelectInput>
      </div>

      <SelectMenu className="select__dropdown" {...state}>
        {countries.map(item => {
          return (
            item.name.match(state.inputValue) &&
            !state.selected.includes(item.name) && (
              <SelectOption
                className="select__dropdown--item"
                {...state}
                key={item.name}
                value={item.name}
              >
                {item.name}
              </SelectOption>
            )
          );
        })}
      </SelectMenu>
    </Select>
  );
};

export default App;
