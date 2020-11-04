import React from "react";
import { DateTimeFormatOpts } from "renderless-components/utils/types";
import { Segment, SegmentField, useSegmentState } from "renderless-components";

interface AppProps {
  /**
   * segment value
   */
  value?: Date;
  /**
   * default segment value
   */
  defaultValue?: Date;
  /**
   * Sets formmating of date based on Intl.DateFormatOptions
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   *
   * @example
   * {
   *   year: "numeric",
   *   month: "2-digit",
   *   day: "2-digit",
   *   weekday: "long",
   * }
   *
   */
  formatOptions?: DateTimeFormatOpts;
  /**
   * placeholder date
   */
  placeholderDate?: Date;
  /**
   * callback to fire on value change
   */
  onChange?: (value: Date, ...args: any[]) => void;
}

export const App: React.FC<AppProps> = props => {
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
