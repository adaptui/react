import React from "react";

import { closest } from "reakit-utils";
import { useShortcut } from "@chakra-ui/hooks";
import { getNextItemFromSearch } from "@chakra-ui/utils";
import { SelectStateReturn } from "./useSelectState";

export const enterOrSpace = (e: any, fn: Function) => {
  if (e.key === "Enter" || e.key === " ") {
    fn && fn(e);
  }
};

export function usePortalShortcut(
  pickerListBoxRef: React.RefObject<HTMLElement>,
  options: Pick<SelectStateReturn, "values" | "currentId" | "move">,
  timeout?: number,
) {
  const onCharacterPress = useShortcut({
    preventDefault: () => true,
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
    const pickerListBox = pickerListBoxRef.current;
    if (!pickerListBox) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const role = target.getAttribute?.("role");
      const targetIsDialog = target === pickerListBox;
      const targetIsOption =
        role &&
        role.indexOf("option") !== -1 &&
        closest(target, "[role=listbox]") === pickerListBox;

      if (!targetIsDialog && !targetIsOption) return;

      // @ts-ignore
      onTypeahead(event);
    };

    // https://github.com/facebook/react/issues/11387#issuecomment-524113945
    pickerListBox.addEventListener("keydown", onKeyDown);
    return () => pickerListBox.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTypeahead]);
}
