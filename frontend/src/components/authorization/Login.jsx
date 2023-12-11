import React from "react";
import { Form, Alert } from "react-bootstrap";
import { DarkButton } from "../forms/Buttons";
import { InputField } from "../forms/Inputs";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

function Login() {
  const { login, authLoginError } = useAuth("");
  const { inputs, handleInputChange, handleSubmit } = useForm(() =>
    login(inputs.email, inputs.password)
  );

  return (
    <div>
      <h5>Login</h5>
      <div className="mt-2">
        {authLoginError && <Alert variant="danger">{authLoginError}</Alert>}
      </div>
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputField
          id="formEmail"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={inputs.email || ""}
          onChange={handleInputChange}
          required
        />
        <InputField
          id="formPassword"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <DarkButton label="Login" />
      </Form>
    </div>
  );
}

export default Login;
