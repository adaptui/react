import React from "react";

import {
  Segment,
  SegmentField,
  useSegmentState,
  SegmentInitialState,
} from "@renderlesskit/react";

export const App: React.FC<SegmentInitialState> = props => {
  const state = useSegmentState(props);
  console.log("%c state.segments", "color: #1d5673", state.segments);

  return (
    <div>
      <SegmentField {...state} className="segment__field">
        {state.segments.map((segment, i) => (
          <Segment
            key={i}
            segment={segment}
            className="segment__field--item"
            {...state}
          />
        ))}
      </SegmentField>
    </div>
  );
};

export default App;
