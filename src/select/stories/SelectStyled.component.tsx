import * as React from "react";

import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "../../index";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

export const App: React.FC<SelectInitialState> = () => {
  const select = useSelectState({ gutter: 8 });

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full max-w-xs mx-auto">
        <div className="space-y-1">
          <div className="block text-sm font-medium leading-5 text-gray-700">
            Assigned to
          </div>
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Select
                {...select}
                aria-labelledby="select-1"
                className="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              >
                <span className="block truncate">
                  {select.selectedValue || "Select a Person"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Select>
            </span>
            <SelectPopover
              as="ul"
              {...select}
              aria-label="Peoples"
              className="w-full py-1 overflow-auto text-base leading-6 bg-white rounded-md shadow-xs shadow-lg max-h-60 focus:outline-none sm:text-sm sm:leading-5 focus:shadow-outline-blue focus:border-blue-300"
            >
              {people.length
                ? people.map(person => (
                    <SelectOption {...select} key={person} value={person}>
                      <li
                        className={`${
                          select.currentValue === person
                            ? "text-white bg-blue-600"
                            : "text-gray-900"
                        } hover:text-white hover:bg-blue-600 cursor-default select-none relative py-2 pl-8 pr-4`}
                      >
                        <span
                          className={`${
                            select.selectedValue === person
                              ? "font-semibold"
                              : "font-normal"
                          } block truncate`}
                        >
                          {person}
                        </span>
                        {select.selectedValue === person && (
                          <span
                            className={`${
                              select.currentValue === person
                                ? "text-white"
                                : "text-blue-600"
                            } hover:text-white absolute inset-y-0 left-0 flex items-center pl-1.5`}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </li>
                    </SelectOption>
                  ))
                : "No results found"}
            </SelectPopover>
          </div>
        </div>
      </div>
    </div>
  );
};
