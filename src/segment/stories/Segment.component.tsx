import React from "react";
import {
  Segment,
  SegmentField,
  useSegmentState,
  SegmentStateProps,
} from "renderless-components";

export const App: React.FC<SegmentStateProps> = props => {
  const state = useSegmentState(props);

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
