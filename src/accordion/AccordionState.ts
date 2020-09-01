import * as React from "react";
import { SealedInitialState, useSealedState } from "reakit-utils";
import {
  unstable_IdInitialState,
  unstable_IdStateReturn,
  unstable_useIdState,
} from "reakit";

export type AccordionInitialState = unstable_IdInitialState & {
  /**
   * Allow to toggle multiple accordion items
   */
  allowMultiple?: boolean;
  loop?: boolean;
  allowToggle?: boolean;
  defaultActiveId?: string;
  manual?: boolean;
};

export type Button = {
  id: string;
  ref: React.RefObject<HTMLElement>;
};

export type Panel = Button;

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
    loop = false,
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
    next: React.useCallback(id => {
      dispatch({ type: "next", id });
    }, []),
    prev: React.useCallback(id => {
      dispatch({ type: "prev", id });
    }, []),
    first: React.useCallback(() => {
      dispatch({ type: "first" });
    }, []),
    last: React.useCallback(() => {
      dispatch({ type: "last" });
    }, []),
  };
}

export type AccordionReducerAction =
  | { type: "registerItem"; item: Item }
  | { type: "registerButton"; button: Button }
  | { type: "registerPanel"; panel: Panel }
  | { type: "addActiveItem"; id: string }
  | { type: "removeActiveItem"; id: string }
  | { type: "next"; id: string }
  | { type: "prev"; id: string }
  | { type: "first" }
  | { type: "last" };

function reducer(
  state: AccordionState,
  action: AccordionReducerAction,
): AccordionState {
  const { items, activeItems, buttons, allowMultiple, loop } = state;

  const total = buttons.length;
  const buttonIds = buttons.map(({ id }) => id);

  switch (action.type) {
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

    case "registerButton": {
      const { button } = action;
      const { nextItem, nextItems } = getNextItem("button", button, items);

      return {
        ...state,
        items: [...nextItems, nextItem],
        buttons: [...buttons, button],
      };
    }

    case "registerPanel": {
      const { panel } = action;
      const { nextItem, nextItems } = getNextItem("panel", panel, items);

      return {
        ...state,
        items: [...nextItems, nextItem],
      };
    }

    case "registerItem": {
      const { item } = action;

      if (items.length === 0) {
        return { ...state, items: [item] };
      }

      return { ...state, items: [...items, item] };
    }

    case "next": {
      const { id } = action;

      const currentIndex = buttonIds.indexOf(id);
      const nextIndex = (currentIndex + 1) % total;

      if (!loop && nextIndex === 0) {
        return { ...state };
      }

      const nextItem = buttons[nextIndex];
      nextItem.ref?.current?.focus();

      return { ...state };
    }

    case "prev": {
      const { id } = action;

      const currentIndex = buttonIds.indexOf(id);
      const prevIndex = (currentIndex - 1 + total) % total;

      if (!loop && prevIndex === total - 1) {
        return { ...state };
      }

      const prevItem = buttons[prevIndex];
      prevItem.ref?.current?.focus();

      return { ...state };
    }

    case "first": {
      const firstItem = buttons[0];
      firstItem.ref?.current?.focus();

      return { ...state };
    }

    case "last": {
      const total = buttons.length;

      const lastItem = buttons[total - 1];
      lastItem.ref?.current?.focus();

      return { ...state };
    }

    default:
      throw new Error();
  }
}

function getNextItem(type: string, currentItem: Button | Panel, items: Item[]) {
  const item = items.find(r =>
    r.ref.current?.contains(currentItem.ref.current),
  );
  const nextItems = items.filter(
    r => !r.ref.current?.contains(currentItem.ref.current),
  );
  const nextItem = { ...item, [type]: currentItem } as Item;

  return { nextItem, nextItems };
}
