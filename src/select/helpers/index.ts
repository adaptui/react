import { kebabCase } from "../../utils";

export function getItemId(baseId: string, value: string, id?: string) {
  return id || `${baseId}-${kebabCase(value)}`;
}

export * from "./useTypeaheadShortcut";
