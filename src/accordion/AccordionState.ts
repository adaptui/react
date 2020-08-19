import * as React from "react";

import { SealedInitialState, useSealedState } from "reakit-utils";
import {
  unstable_IdInitialState,
  unstable_IdStateReturn,
  unstable_useIdState,
} from "reakit";

export function useAccordionState(
  initialState: SealedInitialState<AccordionInitialState> = {},
): AccordionStateReturn {
  const { allowMultiple = false, ...sealed } = useSealedState(initialState);

  const [state, dispatch] = React.useReducer(reducer, {
    items: [],
    activeItems: [],
    buttons: [],
    allowMultiple,
  });

  const idState = unstable_useIdState(sealed);

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
  };
}

function reducer(
  state: AccordionState,
  action: AccordionReducerAction,
): AccordionState {
  const { items, activeItems, allowMultiple } = state;

  switch (action.type) {
    case "addActiveItem": {
      const { id } = action;
      let nextActiveItems;

      if (allowMultiple) {
        nextActiveItems = [...state.activeItems, id];
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
      const item = items.find(r => r.ref.current?.contains(button.ref.current));
      const nextItems = items.filter(
        r => !r.ref.current?.contains(button.ref.current),
      );
      const nextItem = { ...item, button } as Item;

      return {
        ...state,
        items: [...nextItems, nextItem],
        buttons: [...state.buttons, button],
      };
    }

    case "registerPanel": {
      const { panel } = action;
      const item = items.find(r => r.ref.current?.contains(panel.ref.current));
      const nextItems = items.filter(
        r => !r.ref.current?.contains(panel.ref.current),
      );
      const nextItem = { ...item, panel } as Item;

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

      return { ...state, items: [...state.items, item] };
    }

    default:
      throw new Error();
  }
}

export type AccordionInitialState = unstable_IdInitialState & {
  /**
   * Allow to toggle multiple accordion items
   */
  allowMultiple?: boolean;
};

export type Button = {
  id: string;
  ref: React.RefObject<HTMLElement>;
};

export type Panel = {
  id: string;
  ref: React.RefObject<HTMLElement>;
};

export type Item = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  button?: Button;
  panel?: Panel;
};

export type AccordionState = {
  items: Item[];
  activeItems: string[];
  buttons: Button[];
  allowMultiple: boolean;
};

export type AccordionActions = {
  registerItem: (item: Item) => void;
  registerButton: (button: Button) => void;
  registerPanel: (panel: Panel) => void;
  addActiveItem: (id: string) => void;
  removeActiveItem: (id: string) => void;
};

export type AccordionStateReturn = unstable_IdStateReturn &
  AccordionState &
  AccordionActions;

export type AccordionReducerAction =
  | { type: "registerItem"; item: Item }
  | { type: "registerButton"; button: Button }
  | { type: "registerPanel"; panel: Panel }
  | { type: "addActiveItem"; id: string }
  | { type: "removeActiveItem"; id: string };
