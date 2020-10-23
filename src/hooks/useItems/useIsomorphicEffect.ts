import * as React from "react";
import { canUseDOM } from "reakit-utils";

/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side
 * rendering.
 */
export const useIsomorphicEffect = !canUseDOM
  ? React.useEffect
  : React.useLayoutEffect;
