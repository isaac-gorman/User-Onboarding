// Create Form
// [x] Set up inputs in seperate file pass them via props
// [x] Create state to handle the:
// [x] - 1) formState: state of the form
//[x]  - 2) errors: to handle the state of the errors of the form

// [x] Create functions to:
// [x] - 1: handleChange: to handle the changes in the input fields
// [x] - 2: handleSubmit: to handle the submission for the form

// Next construct form validation...
// [x] - Import yup to construct the validation schema
// [x] - Create the yup validation schema and define each requirement
// [x] - Create a function that excutes to check user inputs against the validation schema. Use:
// [x] - -  e.presist()
// [x] - -  .reach() to reach into the formSchema, and pass it the values of each name attribute of the form inputs.
// [x] - Disable the button till all the requirments of the validation schema are meet.
// [x] - use useEffect to preform a side effect to undisable the submit button once the users input passes the validation schema. To do this I must synchronize with formStates values.

import React, { useState, useEffect } from "react";
import Input from "./Input";
import * as yup from "yup";

export default function Form() {
  const defaultState = {
    name: "",
    email: "",
    password: "",
    terms: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  let formSchema = yup.object().shape({
    name: yup.string().required("Please provide a name"),
    email: yup
      .string()
      .required("Please provide an email")
      .email("Please provide a valid email"),
    password: yup
      .string()
      .min(8, "Passwords must be at least 8 characters long")
      .required("Password are required"),
    terms: yup
      .boolean()
      .oneOf([true], "Please agree to the terms and conditions"),
  });

  function validateChange(e) {
    e.persist();

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  }

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
    validateChange(e);
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    console.log("formState values: ", formState);
    setFormState(defaultState);
  };

  return (
    <div>
      <form onSubmit={handlSubmit}>
        <Input
          label="Name:"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          errors={errors}
        />{" "}
        <Input
          label="Email:"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          errors={errors}
        />
        <Input
          label="Password:"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          errors={errors}
        />
        <br />
        <br />
        <label htmlFor="terms">
          Terms and Conditions
          <input
            type="checkbox"
            name="terms"
            id="terms"
            value={formState.terms}
            onChange={handleChange}
            errors={errors}
          />
          {formState.terms === false && <p>{errors.terms}</p>}
        </label>
        <br />
        <br />
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
}
