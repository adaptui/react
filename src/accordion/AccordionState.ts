import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";
import {
  unstable_IdInitialState,
  unstable_IdStateReturn,
  unstable_useIdState,
} from "reakit";
import { getNextItem } from "@chakra-ui/utils";

export type AccordionInitialState = unstable_IdInitialState & {
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Allow to loop accordion items
   * @default true
   */
  loop?: boolean;
  /**
   * Allow to toggle accordion items
   * @default true
   */
  allowToggle?: boolean;
  /**
   * Default Active Id to open by default
   */
  defaultActiveId?: string;
  /**
   * Set manual to false, to navigate and open the accordion items on arrow keys movements
   * @default true
   */
  manual?: boolean;
};

type Button = {
  id: string;
  ref: React.RefObject<HTMLElement>;
};

type Panel = Button;

export type Item = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  button?: Button;
  panel?: Panel;
};

export type AccordionState = AccordionInitialState & {
  items: Item[];
  activeItems: string[];
  buttons: Button[];
};

export type AccordionActions = {
  registerItem: (item: Item) => void;
  registerButton: (button: Button) => void;
  registerPanel: (panel: Panel) => void;
  addActiveItem: (id: string) => void;
  removeActiveItem: (id: string) => void;
  next: (id: string) => void;
  prev: (id: string) => void;
  first: () => void;
  last: () => void;
};

export type AccordionStateReturn = unstable_IdStateReturn &
  AccordionState &
  AccordionActions;

export function useAccordionState(
  initialState: SealedInitialState<AccordionInitialState> = {},
): AccordionStateReturn {
  const {
    loop = true,
    allowToggle = true,
    allowMultiple = false,
    defaultActiveId,
    manual = true,
    ...sealed
  } = useSealedState(initialState);

  const [state, dispatch] = React.useReducer(reducer, {
    items: [],
    activeItems: [],
    buttons: [],
    allowMultiple,
    loop,
    allowToggle,
    defaultActiveId,
    manual,
  });

  const idState = unstable_useIdState(sealed);
  const { buttons } = state;
  const total = buttons.length;
  const buttonIds = buttons.map(({ id }) => id);

  const next = React.useCallback(
    (id: string) => {
      const currentIndex = buttonIds.indexOf(id);
      const nextIndex = (currentIndex + 1) % total;

      if (!loop && nextIndex === 0) return;
      moveFocus(buttons[nextIndex]);
    },
    [buttonIds, buttons, loop, total],
  );

  const prev = React.useCallback(
    (id: string) => {
      const currentIndex = buttonIds.indexOf(id);
      const prevIndex = (currentIndex - 1 + total) % total;

      if (!loop && prevIndex === total - 1) return;
      moveFocus(buttons[prevIndex]);
    },
    [buttonIds, buttons, loop, total],
  );

  const first = React.useCallback(() => {
    moveFocus(buttons[0]);
  }, [buttons]);

  const last = React.useCallback(() => {
    moveFocus(buttons[total - 1]);
  }, [buttons, total]);

  React.useEffect(() => {
    if (defaultActiveId) {
      dispatch({ type: "addActiveItem", id: defaultActiveId });
    }
  }, [defaultActiveId]);

  return {
    ...idState,
    ...state,
    addActiveItem: React.useCallback(id => {
      dispatch({ type: "addActiveItem", id });
    }, []),
    removeActiveItem: React.useCallback(id => {
      dispatch({ type: "removeActiveItem", id });
    }, []),
    registerButton: React.useCallback(button => {
      dispatch({ type: "registerButton", button });
    }, []),
    registerPanel: React.useCallback(panel => {
      dispatch({ type: "registerPanel", panel });
    }, []),
    registerItem: React.useCallback(item => {
      dispatch({ type: "registerItem", item });
    }, []),
    next,
    prev,
    first,
    last,
  };
}

export type AccordionReducerAction =
  | { type: "registerItem"; item: Item }
  | { type: "registerButton"; button: Button }
  | { type: "registerPanel"; panel: Panel }
  | { type: "addActiveItem"; id: string }
  | { type: "removeActiveItem"; id: string };

function reducer(
  state: AccordionState,
  action: AccordionReducerAction,
): AccordionState {
  const { items, activeItems, buttons, allowMultiple } = state;

  switch (action.type) {
    case "registerItem":
      return { ...state, items: [...items, action.item] };

    case "registerButton":
      return {
        ...state,
        items: getNextItems("button", action.button, items),
        buttons: [...buttons, action.button],
      };

    case "registerPanel":
      return {
        ...state,
        items: getNextItems("panel", action.panel, items),
      };

    case "addActiveItem": {
      const { id } = action;
      let nextActiveItems;
      if (allowMultiple) {
        nextActiveItems = [...activeItems, id];
      } else {
        nextActiveItems = [id];
      }

      return { ...state, activeItems: nextActiveItems };
    }

    case "removeActiveItem": {
      const { id } = action;
      const nextActiveItems = activeItems.filter(panelId => panelId !== id);

      return { ...state, activeItems: nextActiveItems };
    }

    default:
      throw new Error();
  }
}

function getNextItems(
  type: "button" | "panel",
  currentThing: Button | Panel,
  items: Item[],
) {
  const item = items.find(item =>
    item.ref.current?.contains(currentThing.ref.current),
  );
  const nextItem = { ...item, [type]: currentThing } as Item;
  const nextItems = items.filter(
    item => !item.ref.current?.contains(currentThing.ref.current),
  );

  return [...nextItems, nextItem];
}

function moveFocus(button: Button) {
  button.ref?.current?.focus();
}
