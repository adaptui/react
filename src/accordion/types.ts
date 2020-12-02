import { CompositeState, CompositeActions } from "reakit";

export type AccordionState = CompositeState & {
  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle: boolean;
  /**
   * Allow to open multiple accordion items
   */
  allowMultiple: boolean;
  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual: boolean;
  /**
   * Lists all the panels.
   */
  panels: CompositeState["items"];
};

export type AccordionActions = CompositeActions & {
  /**
   * Moves into and selects an accordion by its `id`.
   */
  select: CompositeActions["move"];
  /**
   * Moves into and unSelects an accordion by its `id` if it's already selected.
   */
  unSelect: CompositeActions["move"];
  /**
   * Registers a accordion panel.
   */
  registerPanel: CompositeActions["registerItem"];
  /**
   * Unregisters a accordion panel.
   */
  unregisterPanel: CompositeActions["unregisterItem"];
};

export interface CommonAccordionProps {
  /**
   * Whether the accodion selection should be manual.
   * @default true
   */
  manual: boolean;
  /**
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle: boolean;
}

export type SelectedIdPair = {
  /**
   * The current selected accordion's `id`.
   */
  selectedId?: string | null;
  /**
   * Initial selected accordion's `id`.
   * @default []
   */
  selectedIds?: (string | null)[];
  /**
   * Sets `selectedId`.
   */
  setSelectedId?: React.Dispatch<React.SetStateAction<string | null>>;
  /**
   * Sets `selectedIds`.
   */
  setSelectedIds?: React.Dispatch<React.SetStateAction<(string | null)[]>>;
};

export interface SingleAccordionProps extends CommonAccordionProps {
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: false;
  /**
   * The current selected accordion's `id`.
   */
  selectedId?: string | null;
  /**
   * Set default selected id(uncontrolled)
   *
   * @default null
   */
  defaultSelectedId?: string | null;
  /**
   * Handler that is called when the selectedId changes.
   */
  onSelectedIdChange?: (value: string | null) => void;
}

export interface MultiAccordionProps extends CommonAccordionProps {
  /**
   * Allow to open multiple accordion items
   * @default true
   */
  allowMultiple?: true;
  /**
   * Initial selected accordion's `id`.
   * @default []
   */
  selectedIds?: (string | null)[];
  /**
   * Set default selected ids(uncontrolled)
   *
   * @default []
   */
  defaultSelectedIds?: (string | null)[];
  /**
   * Handler that is called when the selectedIds changes.
   */
  onSelectedIdsChange?: (value: (string | null)[]) => void;
}

// State return types //

export interface SingleReturn {
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple: false;
  /**
   * The current selected accordion's `id`.
   */
  selectedId: string | null | undefined;
  /**
   * Sets `selectedId`.
   */
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface MultiReturn {
  /**
   * Allow to open multiple accordion items
   * @default true
   */
  allowMultiple: true;
  /**
   * The current selected accordion's `id`.
   */
  selectedIds: (string | null)[] | undefined;
  /**
   * Sets `selectedIds`.
   */
  setSelectedIds: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

// Overload signatures for useAccordionState
export type SingleOverloadReturn = AccordionActions &
  AccordionState &
  SingleReturn;
export type MultiOverloadReturn = AccordionActions &
  AccordionState &
  MultiReturn;

export type AccordionPropsUnion = SingleAccordionProps | MultiAccordionProps;
export type AccordionReturns = MultiReturn | SingleReturn;
