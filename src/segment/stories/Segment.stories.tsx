import * as React from "react";
import { Meta } from "@storybook/react";

import "./index.css";
import { Segment } from "../Segment";
import { SegmentField } from "../SegmentField";
import { useSegmentState, SegmentStateProps } from "../SegmentState";

export default {
  title: "Segment",
} as Meta;

const SegmentSpinnerComp: React.FC<SegmentStateProps> = props => {
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

export const Default = () => (
  <div className="segment_demo">
    <pre>
      year: "numeric", month: "2-digit", day: "2-digit", weekday: "long",
    </pre>
    <SegmentSpinnerComp
      formatOptions={{
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      }}
    />

    <pre>timeStyle: "long", dateStyle: "short"</pre>
    <SegmentSpinnerComp
      formatOptions={{
        timeStyle: "long",
        dateStyle: "short",
      }}
    />

    <pre>timeStyle: "short", dateStyle: "long"</pre>
    <SegmentSpinnerComp
      formatOptions={{
        timeStyle: "short",
        dateStyle: "long",
      }}
    />

    <pre>timeStyle: "full", dateStyle: "full"</pre>
    <SegmentSpinnerComp
      formatOptions={{
        timeStyle: "full",
        dateStyle: "full",
      }}
    />
  </div>
);
