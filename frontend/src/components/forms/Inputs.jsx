import React from "react";
import { Form } from "react-bootstrap";

export const InputField = ({
  id,
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  ...props
}) => (
  <Form.Group controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mb-3"
      {...props}
    />
  </Form.Group>
);
