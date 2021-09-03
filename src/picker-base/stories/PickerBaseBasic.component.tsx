import * as React from "react";

import {
  PickerBase as RenderlesskitPickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
  PickerBaseInitialState,
} from "../../index";

export const PickerBase: React.FC<PickerBaseInitialState> = props => {
  const state = usePickerBaseState(props);

  return (
    <>
      <RenderlesskitPickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </RenderlesskitPickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export default PickerBase;
