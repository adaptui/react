import "./Select.css";
import React from "react";
import { Meta, Story } from "@storybook/react";

import { appTemplate, appTemplateJs, cssTemplate } from "./templates";
import { App as Select } from "./Select.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Select,
  title: "Select/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: appTemplateJs,
      ts: appTemplate,
      css: cssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Select {...args} />;

export const Default = Base.bind({});
export const MultiSelect = Base.bind({});
MultiSelect.args = { allowMultiselect: true };

// const countries = [
//   { name: "australia", emoji: "🇦🇺" },
//   { name: "russia", emoji: "🇷🇺" },
//   { name: "new zealand", emoji: "🇳🇿" },
//   { name: "india", emoji: "🇮🇳" },
//   { name: "niger", emoji: "🇳🇪" },
//   { name: "canada", emoji: "🇨🇦" },
//   { name: "indonesia", emoji: "🇮🇩" },
//   { name: "portugal", emoji: "🇵🇹" },
//   { name: "norway", emoji: "🇳🇴" },
//   { name: "switzerland", emoji: "🇨🇭" },
//   { name: "africa", emoji: "🇨🇫" },
//   { name: "colombia", emoji: "🇨🇴" },
//   { name: "costa rica", emoji: "🇨🇷" },
//   { name: "zimbabwe", emoji: "🇿🇼" },
// ];

// const SelectPicker: React.FC<{ state: any }> = ({ state }) => {
//   return (
//     <Select
//       className="select"
//       {...state}
//       onChange={(value: any) => console.log(value)}
//     >
//       <SelectTrigger className="select__header" {...state}>
//         <b style={{ color: state.isPlaceholder ? "#5d5b97" : "#33324d" }}>
//           {state.isPlaceholder ? "Select one.." : state.selected.join(",")}
//         </b>
//       </SelectTrigger>

//       <SelectMenu
//         {...state}
//         className="select__dropdown"
//         style={{ maxHeight: 200, overflowY: "scroll" }}
//       >
//         {countries.map(item => {
//           return (
//             <SelectOption
//               className="select__dropdown--item"
//               {...state}
//               key={item.name}
//               value={item.name}
//             >
//               {item.emoji} - {item.name}
//             </SelectOption>
//           );
//         })}
//       </SelectMenu>
//     </Select>
//   );
// };

// export const MultiSelect: React.FC = () => {
//   const state = useSelectState({ allowMultiselect: true });

//   return (
//     <Select
//       className="select"
//       {...state}
//       onChange={(value: any) => console.log(value)}
//     >
//       <SelectTrigger className="select__header" {...state}>
//         <b style={{ color: state.isPlaceholder ? "#5d5b97" : "#33324d" }}>
//           {state.isPlaceholder ? "Select one.." : state.selected.join(" ")}
//         </b>
//       </SelectTrigger>

//       <SelectMenu
//         {...state}
//         className="select__dropdown"
//         style={{ maxHeight: 200, overflowY: "scroll" }}
//       >
//         {countries.map(item => {
//           return (
//             <SelectOption
//               className="select__dropdown--item"
//               {...state}
//               key={item.name}
//               value={item.emoji}
//             >
//               {item.emoji} - {item.name}
//             </SelectOption>
//           );
//         })}
//       </SelectMenu>
//     </Select>
//   );
// };

// export const MultiSelectCheckboxes: React.FC = () => {
//   const state = useSelectState({ allowMultiselect: true });

//   return (
//     <Select
//       className="select"
//       {...state}
//       onChange={(value: any) => console.log(value)}
//     >
//       <SelectTrigger className="select__header" {...state}>
//         <b style={{ color: state.isPlaceholder ? "gray" : "black" }}>
//           {state.isPlaceholder
//             ? "Select one.."
//             : `(${state.selected.length}) Items Selected`}
//         </b>
//       </SelectTrigger>

//       <SelectMenu
//         className="select__dropdown"
//         {...state}
//         style={{ maxHeight: 200, overflowY: "scroll" }}
//       >
//         {countries.map(item => {
//           return (
//             <SelectOption
//               className="select__dropdown--item"
//               {...state}
//               key={item.name}
//               value={item.name}
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={!!state.selected.includes(item.name)}
//                 />{" "}
//                 <span>{item.name}</span>
//               </label>
//             </SelectOption>
//           );
//         })}
//       </SelectMenu>
//     </Select>
//   );
// };

export const DefaultSelected = Base.bind({});
DefaultSelected.args = { selected: "india" };

export const Scrolling: React.FC = () => {
  return (
    <div style={{ margin: "800px 0" }}>
      <Select />
    </div>
  );
};
