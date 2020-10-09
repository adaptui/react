import * as React from "react";
import { Meta } from "@storybook/react";

import { PickerBase, PickerBaseContent, PickerBaseTrigger } from "../index";
import { PickerBaseInitialState, usePickerBaseState } from "../PickerBaseState";

export default {
  title: "Component/PickerBase",
} as Meta;

const PickerBaseComp: React.FC<PickerBaseInitialState> = props => {
  const state = usePickerBaseState({
    ...props,
  });

  return (
    <>
      <PickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </PickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export const Default = () => <PickerBaseComp />;
export const Visible = () => <PickerBaseComp visible={true} />;
