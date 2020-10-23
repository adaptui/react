import * as React from "react";

export function useAction<T extends (...args: any[]) => any>(fn: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(fn, []);
}
