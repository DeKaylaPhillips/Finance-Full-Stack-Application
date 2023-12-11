import React from "react";
import { Form, Alert } from "react-bootstrap";
import { DarkButton } from "../forms/Buttons";
import { InputField } from "../forms/Inputs";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

function Register() {
  const { register, authRegistrationError } = useAuth("");
  const { inputs, handleInputChange, handleSubmit } = useForm(() =>
    register(inputs.firstName, inputs.lastName, inputs.email, inputs.password)
  );

  return (
    <div>
      <h5>Create An Account</h5>
      <div className="mt-2">
        {authRegistrationError && (
          <Alert variant="danger">{authRegistrationError} </Alert>
        )}
      </div>
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputField
          id="formFirstName"
          name="firstName"
          type="text"
          label="First Name"
          placeholder="First Name"
          value={inputs.firstName || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formLastName"
          name="lastName"
          type="text"
          label="Last Name"
          placeholder="Last Name"
          value={inputs.lastName || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formEmail"
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formPassword"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <DarkButton label="Register" />
      </Form>
    </div>
  );
}

export default Register;
