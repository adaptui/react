import {
  PickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
} from "../index";

export interface AppProps {
  visible?: boolean;
}

export const App = (props: AppProps) => {
  const state = usePickerBaseState(props);

  return (
    <>
      <PickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </PickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export default App;
