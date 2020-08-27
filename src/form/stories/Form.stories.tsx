/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Meta } from "@storybook/react";
import { Button, Portal } from "reakit";
import {
  useFormState,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormMessage,
  FormCheckbox,
  FormRadio,
  FormRadioGroup,
  FormPushButton,
  FormRemoveButton,
  FormSubmitButton,
} from "../index";

export default {
  title: "Component/Form",
  component: Form,
} as Meta;

export function Component() {
  const form = useFormState({
    values: { name: "" },
    onValidate: values => {
      if (!values.name) {
        const errors = {
          name: "How can we be friends without knowing your name?",
        };
        throw errors;
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="name">
        Name
      </FormLabel>
      <FormInput {...form} name="name" placeholder="John Doe" />
      <FormMessage {...form} name="name" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export function Textarea() {
  const form = useFormState({
    values: { message: "" },
    onValidate: values => {
      if (!values.message) {
        const errors = {
          message: "Please enter a message.",
        };
        throw errors;
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormLabel {...form} name="message">
        Message
      </FormLabel>
      <FormInput
        {...form}
        name="message"
        placeholder="What's on your mind?"
        as="textarea"
      />
      <FormMessage {...form} name="message" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export function Array() {
  const form = useFormState({
    values: {
      people: [{ name: "", email: "" }],
    },
    onValidate: values => {
      const errors = {};
      values.people.forEach((value, i) => {
        if (!value.email) {
          if (!errors.people) {
            errors.people = [];
          }
          if (!errors.people[i]) {
            errors.people[i] = {};
          }
          errors.people[i].email =
            "We can't sell data without an email, can we?";
        }
      });
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      {form.values.people.map((_, i) => (
        <React.Fragment key={i}>
          <FormLabel {...form} name={["people", i, "name"]}>
            Name
          </FormLabel>
          <FormInput {...form} name={["people", i, "name"]} />
          <FormMessage {...form} name={["people", i, "name"]} />
          <FormLabel {...form} name={["people", i, "email"]}>
            Email
          </FormLabel>
          <FormInput {...form} type="email" name={["people", i, "email"]} />
          <FormMessage {...form} name={["people", i, "email"]} />
          <FormRemoveButton {...form} name="people" index={i}>
            Remove person
          </FormRemoveButton>
        </React.Fragment>
      ))}
      <br />
      <br />
      <FormPushButton {...form} name="people" value={{ name: "", email: "" }}>
        Add person
      </FormPushButton>
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export function Checkbox() {
  const form = useFormState({
    values: {
      accepted: false,
      preferences: [],
    },
    onValidate: values => {
      const errors = {};
      if (!values.accepted) {
        errors.accepted = "You must accept our not-so-evil conditions!";
      }
      if (!values.preferences.includes("JS")) {
        errors.preferences = "Why not JS? It's so cool! 🙁";
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormCheckbox {...form} name="accepted" />
      <FormLabel {...form} name="accepted">
        Accept conditions
      </FormLabel>
      <FormMessage {...form} name="accepted" />
      <FormGroup {...form} name="preferences">
        <FormLabel {...form} as="legend" name="preferences">
          Preferences
        </FormLabel>
        <label>
          <FormCheckbox {...form} name="preferences" value="html" /> HTML
        </label>
        <label>
          <FormCheckbox {...form} name="preferences" value="css" /> CSS
        </label>
        <label>
          <FormCheckbox {...form} name="preferences" value="JS" /> JS
        </label>
      </FormGroup>
      <FormMessage {...form} name="preferences" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export function Radio() {
  const form = useFormState({
    values: { choice: "" },
    onValidate: values => {
      if (values.choice !== "js") {
        const errors = { choice: "YOU WILL BE FIRED!" };
        throw errors;
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form {...form}>
      <FormRadioGroup {...form} name="choice">
        <FormLabel {...form} as="legend" name="choice">
          Choice
        </FormLabel>
        <label>
          <FormRadio {...form} name="choice" value="html" /> HTML
        </label>
        <label>
          <FormRadio {...form} name="choice" value="css" /> CSS
        </label>
        <label>
          <FormRadio {...form} name="choice" value="js" /> JS
        </label>
      </FormRadioGroup>
      <FormMessage {...form} name="choice" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}
