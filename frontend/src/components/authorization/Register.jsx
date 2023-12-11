import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Form, Button, Alert } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { InputField } from "../forms/Inputs";

function Register() {
  const { register, authError } = useAuth("");
  const { inputs, handleInputChange, handleSubmit } = useForm(() =>
    register(inputs.firstName, inputs.lastName, inputs.email, inputs.password)
  );

  return (
    <div>
      <h5>Register</h5>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputField
          id="formFirstName"
          name="firstName"
          type="text"
          label="First Name"
          value={inputs.firstName || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formLastName"
          name="lastName"
          type="text"
          label="Last Name"
          value={inputs.lastName || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formEmail"
          name="email"
          type="email"
          label="Email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formPassword"
          name="password"
          type="password"
          label="Password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="dark" className="mt-3">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
