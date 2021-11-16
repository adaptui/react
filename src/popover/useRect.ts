import * as React from "react";

import { Measurable, observeElementRect } from "./rect";

/**
 * Use this custom hook to get access to an element's rect (getBoundingClientRect)
 * and observe it along time.
 */
function useRect(measurable: Measurable | null) {
  const [rect, setRect] = React.useState<ClientRect>();

  React.useEffect(() => {
    if (measurable) {
      const unobserve = observeElementRect(measurable, setRect);

      return () => {
        setRect(undefined);
        unobserve();
      };
    }
    return;
  }, [measurable]);

  return rect;
}

export { useRect };
