import * as React from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

export function useIsUnmountedRef() {
  const isUnmountedRef = React.useRef(false);
  useIsomorphicEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
  return isUnmountedRef;
}
