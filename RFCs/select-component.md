## The Goal:

Build a select component which follows the aria best practices. Select component
should be composable, flexible, accessible & renderless.

The single select will follow WAI-ARIA specs for the list box pattern. These are
the key resources we need to create this Select.

- https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-scrollable.html
- https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
- https://www.w3.org/TR/wai-aria-practices/#kbd_focus_vs_selection
- https://www.w3.org/TR/wai-aria-1.1/#select

## Key Features:

### Typehead support:

#### When the select is open and focus is on the select list box

- Typing the first letter of an option sends focus to that option.
- Type multiple characters in rapid succession: focus moves to the next item
  with a name that starts with the string of characters typed.

#### When the select is not open and focus is on the select dropdown button

- Typing the first letter of an option directly selects the option without
  opening the dropdown.
- Type multiple characters in rapid succession: selects the next item with a
  name that starts with the string of characters typed, without opening the
  dropdown.

#### Keyboard navigation:

##### Select Dropdown Trigger

| Keyboard      | Behaviour                                     |
| ------------- | --------------------------------------------- |
| Enter / Space | Opens the select dropdown.                    |
| Escape        | Closes the select dropdown.                   |
| Down Arrow    | Opens the dropdown & move focus to next item  |
| Up Arrow      | Open the dropdown move focus to previous item |

##### SelectMenu (list)

- Using the up and down arrow should navigate the options. Any option that's
  disabled should be skipped in the navigation, we can use reakit's composite
  component to easily achive this behaviour.

- The Home and End key should select the first and last option respectively.

- Scrolling into view: In the event, the options are quite many and we navigate
  via keyboard or typeahead, any option is focused that isn't (fully) visible
  should be scrolled into view. Perhaps `scroll-into-view-if-needed` might help.

NOTE: I've seen that all of the above mentioned keyboard behaviours are also
implemented in Reakit's Menu component. https://reakit.io/docs/menu/

- Auto select:

  - If `autoSelect` is true, highlighting an option must also select that option
  - If `autoSelect` is false, a highlighted option must be manually selected
    using the SPACEBAR or ENTER key.

- Virtualize Menu: If there's a large number of options, we might need to
  improve render performance by using `react-virtualized`

### Component Parts:

- **useSelectState:** hook that holds all the a11y and behaviour logic.
- **Select:** The wrapper that provides the context and functionalities
- **SelectTrigger: (compose usePopover)** The element that triggers the list
  box.
- **SelectMenu:** The wrapper for the popover. It composes the `Popper`
  component.
- **SelectOption:** Each option in the select.
- **SelectOptionGroup:** A wrapper for a set of options that can be labeled.
  Similar to the `<optgroup>` in the native browser select.

## Initial API

```jsx
const state = useSelectState({ defaultSelected: "mango" });

<Select {...state}>
  <SelectTrigger {...state}>
    {state.placeholderVisible ? "Select one.." : state.value}
  </SelectTrigger>

  <SelectMenu {...state}>
    <SelectOption {...state} value="apples">
      Apples
    </SelectOption>
    <SelectOption {...state} value="oranges">
      Oranges
    </SelectOption>
    <SelectOption {...state} value="bananna">
      Bananna
    </SelectOption>
    <SelectOption {...state} value="mango">
      Mango
    </SelectOption>
  </SelectMenu>
</Select>;
```

## Props

### Use Select State Props

- **defaultIsOpen:** If `true`, the select should be open initially.
- **isOpen:** If `true`, the select should be open in controlled mode.
- **defaultHighlighted:** value of the select option item which would be
  highlighted initially.
- **autoSelect:** If `true`, the option will be selected as you navigate through
  them.
- **closeOnSelect:** If `true`, the select menu will close when you select an
  option.
- **defaultValue:** The initial selected value
- **onChange:** Callback fired when an option is selected
- **isDisabled:** If `true` the select control will be disabled
- **isReadOnly:** If `true`, the select will be in read-only mode

```ts
const state = useSelectState({
  defaultOpen: "some value",
  defaultValue: "some value",
  defaultHighlighted: "some value",
  isOpen: true,
  onChange: (value: string) => {},
  closeOnSelect: true,
  autoSelect: false,
  isDisabled: false,
  isReadOnly: false,
});
```

- Returns :-
  - **value:** The selected value.
  - **placeholderVisible:** Helper flag to indicate if no items are selected.

### SelectOptionGroup Props

- **isDisabled:** If `true`, all the SelectOption that it wraps will be disabled
- **label:** The label for the option group

### SelectOption Props

- **isSelected** if `true` sets this element as default selected
- **disabled** if `true` sets this option as default disabled
- **value** Sets this options value

### Related issues

https://github.com/reakit/reakit/issues/256

Other libs & implementations for inspiration:

- https://react-select.com/
- Timelessco's select component we worked on:
  https://renderless-components.netlify.app/?path=/story/component-select--default
