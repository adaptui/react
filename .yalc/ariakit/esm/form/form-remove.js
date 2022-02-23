import { useCallback } from 'react';
import { isTextField } from 'ariakit-utils/dom';
import { useEventCallback } from 'ariakit-utils/hooks';
import { useStore } from 'ariakit-utils/store';
import { createHook, createComponent, createElement } from 'ariakit-utils/system';
import { F as FormContext } from '../__utils-6eda8bb9.js';
import { useButton } from '../button/button.js';

function findNextOrPreviousField(items, name, index) {
  const fields = items == null ? void 0 : items.filter(item => item.type === "field" && item.name.startsWith(name));
  const regex = new RegExp("^" + name + "\\.(\\d+)");
  const nextField = fields == null ? void 0 : fields.find(field => {
    const fieldIndex = field.name.replace(regex, "$1");
    return parseInt(fieldIndex) > index;
  });
  if (nextField) return nextField;
  return fields == null ? void 0 : fields.reverse().find(field => {
    const fieldIndex = field.name.replace(regex, "$1");
    return parseInt(fieldIndex) < index;
  });
}

function findPushButton(items, name) {
  return items == null ? void 0 : items.find(item => item.type === "button" && item.name === name);
}
/**
 * A component hook that returns props that can be passed to `Role` or any other
 * Ariakit component to render a button that will remove an item from an array
 * field in the form when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const state = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * const props = useFormRemove({
 *   state,
 *   name: state.names.languages,
 *   index: 0,
 * });
 * <Form state={state}>
 *   {state.values.languages.map((_, i) => (
 *     <FormInput key={i} name={state.names.languages[i]} />
 *   ))}
 *   <Role {...props}>Remove first language</Role>
 * </Form>
 * ```
 */


const useFormRemove = createHook(_ref => {
  var _state4, _state5;

  let {
    state,
    name: nameProp,
    index,
    autoFocusOnClick = true,
    ...props
  } = _ref;
  const name = "" + nameProp;
  state = useStore(state || FormContext, ["items", "removeValue"]);
  const onClickProp = useEventCallback(props.onClick);
  const onClick = useCallback(event => {
    var _state, _state2;

    onClickProp(event);
    if (event.defaultPrevented) return;
    (_state = state) == null ? void 0 : _state.removeValue(name, index);
    if (!autoFocusOnClick) return;
    const item = findNextOrPreviousField((_state2 = state) == null ? void 0 : _state2.items, name, index);
    const element = item == null ? void 0 : item.ref.current;

    if (element) {
      element.focus();

      if (isTextField(element)) {
        element.select();
      }
    } else {
      var _state3, _pushButton$ref$curre;

      const pushButton = findPushButton((_state3 = state) == null ? void 0 : _state3.items, name);
      pushButton == null ? void 0 : (_pushButton$ref$curre = pushButton.ref.current) == null ? void 0 : _pushButton$ref$curre.focus();
    }
  }, [onClickProp, (_state4 = state) == null ? void 0 : _state4.removeValue, name, index, autoFocusOnClick, (_state5 = state) == null ? void 0 : _state5.items]);
  props = { ...props,
    onClick
  };
  props = useButton(props);
  return props;
});
/**
 * A component that renders a button that will remove an item from an array
 * field in the form when clicked.
 * @see https://ariakit.org/components/form
 * @example
 * ```jsx
 * const form = useFormState({
 *   defaultValues: {
 *     languages: ["JavaScript", "PHP"],
 *   },
 * });
 * <Form state={form}>
 *   {form.values.languages.map((_, i) => (
 *     <div key={i}>
 *       <FormInput name={form.names.languages[i]} />
 *       <FormRemove name={form.names.languages} index={i} />
 *     </div>
 *   ))}
 * </Form>
 * ```
 */

const FormRemove = createComponent(props => {
  const htmlProps = useFormRemove(props);
  return createElement("button", htmlProps);
});

export { FormRemove, useFormRemove };
