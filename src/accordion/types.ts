import { Dispatch, SetStateAction } from "react";
import {
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "reakit";

export type StringOrNull = string | null;

export type AccordionState = CompositeState & {
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
   * Allow to toggle accordion items
   * @default false
   */
  allowToggle: boolean;
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

export type CommonAccordionProps = {
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
};

export type SelectedIdPair = {
  selectedId?: StringOrNull;
  selectedIds?: StringOrNull[];
  setSelectedId?: Dispatch<SetStateAction<StringOrNull>>;
  setSelectedIds?: Dispatch<SetStateAction<StringOrNull[]>>;
};

export type SingleAccordionProps = CommonAccordionProps & {
  /**
   * Allow to open multiple accordion items
   * @default false
   */
  allowMultiple?: false;
  /**
   * The current selected accordion's `id`.
   */
  selectedId?: StringOrNull;
  /**
   * Set default selected id(uncontrolled)
   *
   * @default null
   */
  defaultSelectedId?: StringOrNull;
  /**
   * Handler that is called when the selectedId changes.
   */
  onSelectedIdChange?: (value: StringOrNull) => void;
};

export type MultiAccordionProps = CommonAccordionProps & {
  /**
   * Allow to open multiple accordion items
   * @default true
   */
  allowMultiple?: true;
  /**
   * Initial selected accordion's `id`.
   * @default []
   */
  selectedIds?: StringOrNull[];
  /**
   * Set default selected ids(uncontrolled)
   *
   * @default []
   */
  defaultSelectedIds?: StringOrNull[];
  /**
   * Handler that is called when the selectedIds changes.
   */
  onSelectedIdsChange?: (value: StringOrNull[]) => void;
};

// State return types //

export type SingleReturn = {
  /**
   * Allow to open multiple accordion items
   */
  allowMultiple: false;
  /**
   * The current selected accordion's `id`.
   */
  selectedId: SelectedIdPair["selectedId"] | undefined;
  /**
   * Sets `selectedId`.
   */
  setSelectedId: NonNullable<SelectedIdPair["setSelectedId"]>;
};

export type MultiReturn = {
  /**
   * Allow to open multiple accordion items
   */
  allowMultiple: true;
  /**
   * The current selected accordion's `id`.
   */
  selectedIds: SelectedIdPair["selectedIds"] | undefined;
  /**
   * Sets `selectedIds`.
   */
  setSelectedIds: NonNullable<SelectedIdPair["setSelectedIds"]>;
};

// Overload signatures for useAccordionState
type AccordionStateActions = AccordionActions & AccordionState;
export type SingleOverloadReturn = AccordionStateActions & SingleReturn;
export type MultiOverloadReturn = AccordionStateActions & MultiReturn;

type AccordionProps = SingleAccordionProps | MultiAccordionProps;
export type AccordionReturns = MultiReturn | SingleReturn;

export type AccordionInitialState = Partial<
  CompositeInitialState & AccordionProps
>;
export type AccordionInitialStateSingle = Partial<
  CompositeInitialState & SingleAccordionProps
>;
export type AccordionInitialStateMulti = Partial<
  CompositeInitialState & MultiAccordionProps
>;
