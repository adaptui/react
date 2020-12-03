import * as React from "react";

import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "@renderlesskit/react";

type User = { value: string; label: string };

export const App: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ gutter: 8, ...props });
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const getOptions = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      const users = data.map((d: any) => ({
        value: d.username,
        label: d.name,
      }));
      setUsers(users);
    };

    getOptions();
  }, []);

  const selectedUser = users.find(user => user.value === select.selectedValue);

  return (
    <>
      <Select className="select" {...select} aria-label="User">
        {selectedUser?.label || "Select a user"}
      </Select>
      <SelectPopover {...select} aria-label="Users">
        {users.length
          ? users.map(({ value, label }) => (
              <SelectOption {...select} key={value} value={value}>
                {label}
              </SelectOption>
            ))
          : "Loading..."}
      </SelectPopover>
    </>
  );
};

export default App;
