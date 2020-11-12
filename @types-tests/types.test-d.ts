/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { expectError, expectType } from "tsd";
import {
  MultiOverloadReturn,
  SingleOverloadReturn,
} from "../src/accordion/types";
import { useAccordionState } from "../src/accordion/AccordionState";

const multi = useAccordionState({ allowMultiple: true });
expectType<(string | null)[] | undefined>(multi.selectedIds);
expectType<React.Dispatch<React.SetStateAction<(string | null)[]>>>(
  multi.setSelectedIds,
);
expectType<MultiOverloadReturn>(multi);

const single = useAccordionState({ allowMultiple: false });
expectType<string | null | undefined>(single.selectedId);
expectType<React.Dispatch<React.SetStateAction<string | null>>>(
  single.setSelectedId,
);
expectType<SingleOverloadReturn>(single);

expectType<MultiOverloadReturn>(
  useAccordionState({
    allowMultiple: true,
    defaultSelectedIds: [],
  }),
);

expectError(
  useAccordionState({
    allowMultiple: true,
    defaultSelectedId: "",
  }),
);

expectError(
  useAccordionState({
    allowMultiple: false,
    defaultSelectedIds: [],
  }),
);

expectType<SingleOverloadReturn>(
  useAccordionState({
    allowMultiple: false,
    defaultSelectedId: "",
  }),
);
