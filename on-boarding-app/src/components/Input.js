import React, { useState } from "react";

export default function Input(props) {
  const errorMessage = props.errors[props.name];

  return (
    <label htmlFor={props.label}>
      <br />
      <br />
      {props.label}
      <br />
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        errors={props.errors}
      />
      {errorMessage != 0 && (
        <p style={{ color: "red", fontSize: ".55em" }}>{errorMessage}</p>
      )}
    </label>
  );
}
