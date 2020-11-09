import {
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "reakit";

export type AccordionState = CompositeState & {
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
  select: AccordionActions["move"];
  /**
   * Moves into and unSelects an accordion by its `id` if it's already selected.
   */
  unSelect: AccordionActions["move"];
  /**
   * Registers a accordion panel.
   */
  registerPanel: AccordionActions["registerItem"];
  /**
   * Unregisters a accordion panel.
   */
  unregisterPanel: AccordionActions["unregisterItem"];
};

interface CommonAccordionProps {
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

interface SingleProps extends CommonAccordionProps {
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

interface MultipleProps extends CommonAccordionProps {
  /**
   * Allow to open multiple accordion items
   * @default true
   */
  allowMultiple: true;
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
  onSelectedIdsChange: (value: (string | null)[]) => void;
}

// State return types //

interface SingleStateReturn {
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
  setSelectedId: AccordionActions["setCurrentId"];
}

interface MultiStateReturn {
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
  setSelectedIds: React.Dispatch<
    React.SetStateAction<(string | null)[] | undefined>
  >;
}

// Overload signatures for useAccordionState
export type SingleOverloadSignature = AccordionActions &
  AccordionState &
  SingleStateReturn;
export type MultiOverloadSignature = AccordionActions &
  AccordionState &
  MultiStateReturn;

type AccordionProps = SingleProps | MultipleProps;
export type AccordionInitialState = CompositeInitialState & AccordionProps;
export type AccordionInitialStateSingle = CompositeInitialState & SingleProps;
export type AccordionInitialStateMulti = CompositeInitialState & MultipleProps;

export type AccordionStateReturn = AccordionActions &
  AccordionState &
  (MultiStateReturn | SingleStateReturn);
