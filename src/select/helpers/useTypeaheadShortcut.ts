import React from "react";
import { closest } from "reakit-utils";
import { useShortcut } from "@chakra-ui/hooks";
import { getNextItemFromSearch } from "@chakra-ui/utils";

import { SelectStateReturn } from "../SelectState";
import { getIdFromValue } from "../SelectBaseState";

type TypeAheadShortcutOptions = Pick<
  SelectStateReturn,
  "values" | "currentValue" | "valuesById" | "move"
>;
interface useTypeaheadShortcutProps {
  options: TypeAheadShortcutOptions;
  ref: React.RefObject<HTMLElement>;
  timeout?: number;
}

// Reference:
// https://github.com/reakit/reakit/blob/01e73eaff9405ecf8838906684811ef70970b867/packages/reakit/src/Menu/__utils/useShortcuts.ts
export function useTypeaheadShortcut({
  ref,
  options,
  timeout,
}: useTypeaheadShortcutProps) {
  const onCharacterPress = useShortcut({
    preventDefault: event => event.key !== " ",
    timeout,
  });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const role = target.getAttribute?.("role");
      const targetIsDialog = target === element;
      const targetIsOption =
        (role && role.indexOf("option") !== -1) ||
        closest(target, "[role=listbox]") === element;

      if (!targetIsDialog && !targetIsOption) return;

      // @ts-ignore
      onCharacterPress(handleCharacterPress(options))(event);
    };

    // https://github.com/facebook/react/issues/11387#issuecomment-524113945
    element.addEventListener("keydown", onKeyDown);
    return () => element.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCharacterPress]);
}

const handleCharacterPress = (options: TypeAheadShortcutOptions) => (
  character: string,
) => {
  const selectedValue = options.values.find(value =>
    options.currentValue?.includes(value),
  );

  const nextItem = getNextItemFromSearch(
    options.values,
    character,
    item => item ?? "",
    selectedValue,
  );

  if (nextItem) {
    const nextId = getIdFromValue(options.valuesById, nextItem);
    options.move?.(nextId);
  }
};
