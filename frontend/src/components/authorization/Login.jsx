import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Form, Button, Alert } from "react-bootstrap";
import useLoginForm from "../../hooks/useLoginForm";
import { InputField } from "../forms/Inputs";

function Login() {
  const { login, authError } = useAuth("");
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(() =>
    login(inputs.email, inputs.password)
  );

  return (
    <div>
      <h5>Login</h5>
      {authError && <Alert variant="danger">{authError}</Alert>}
      <Form onSubmit={handleSubmit} className="mt-3">
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
          placeholder="Enter your password"
          value={inputs.password || ""}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="dark" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
