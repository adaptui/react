import React from "react";

import {
  Segment as RenderlesskitSegment,
  SegmentField,
  useSegmentState,
  SegmentInitialState,
} from "../../index";

export const Segment: React.FC<SegmentInitialState> = props => {
  const state = useSegmentState(props);

  return (
    <div>
      <SegmentField {...state} className="segment__field">
        {state.segments.map((segment, i) => (
          <RenderlesskitSegment
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

export default Segment;
