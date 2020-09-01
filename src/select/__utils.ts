import React from "react";
import { closest } from "reakit-utils";
import { useShortcut } from "@chakra-ui/hooks";
import { getNextItemFromSearch } from "@chakra-ui/utils";
import { SelectStateReturn } from "./SelectState";

interface usePortalShortcutProps {
  ref: React.RefObject<HTMLElement>;
  options: Pick<SelectStateReturn, "values" | "currentId" | "move">;
  timeout?: number;
  disable?: boolean;
}
// Reference:
// https://github.com/reakit/reakit/blob/01e73eaff9405ecf8838906684811ef70970b867/packages/reakit/src/Menu/__utils/useShortcuts.ts
export function usePortalShortcut({
  ref,
  options,
  timeout,
  disable = false,
}: usePortalShortcutProps) {
  const onCharacterPress = useShortcut({
    preventDefault: event => event.key !== " ",
    timeout,
  });

  const onTypeahead = onCharacterPress(character => {
    const selectedValue = options.values.find(
      value => value.id === options.currentId,
    );

    const nextItem = getNextItemFromSearch(
      options.values,
      character,
      item => item?.value ?? "",
      selectedValue,
    );

    if (nextItem?.id) {
      options.move?.(nextItem.id);
    }
  });

  React.useEffect(() => {
    if (disable) return;
    const element = ref.current;
    if (!element) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const role = target.getAttribute?.("role");
      const targetIsDialog = target === element;
      const targetIsOption =
        role &&
        role.indexOf("option") !== -1 &&
        closest(target, "[role=listbox]") === element;

      if (!targetIsDialog && !targetIsOption) return;

      // @ts-ignore
      onTypeahead(event);
    };

    // https://github.com/facebook/react/issues/11387#issuecomment-524113945
    element.addEventListener("keydown", onKeyDown);
    return () => element.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTypeahead]);
}
