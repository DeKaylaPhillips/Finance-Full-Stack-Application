import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Authentication() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function createAccount(event) {
    event.preventDefault();

    if (!isValidPassword()) {
      console.error("Password length not valid.");
      setError("Password must contain 8 or more characters.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return;
    }

    const response = await axios.post("/api/create_account/", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });

    const isAccountCreated = response.data["account_created"];

    if (isAccountCreated) {
      alert(
        "Your account was successfully created. Please login after refresh..."
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setError(response.data["error"]);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }

  async function login(event) {
    event.preventDefault();
    const response = await axios.post("/api/sign_in/", {
      email: username,
      password: userPassword,
    });

    const isAuthenticated = response.data["login"];
    
    if (isAuthenticated) {
      alert(`Hello! Redirecting you to your dashboard page...`);
      setTimeout(() => {
        goToDashboard();
      }, 2000);
    } else {
      setLoginError(response.data["error"]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const isValidPassword = () => {
    return password.length >= 8 ? true : false;
  };

  return (
    <div className="container">
      <h1 className="mt-5">Capital Kay Finance</h1>
      <h3>Personal budgetting, financial news, and salary data.</h3>
      <br />
      <h5>Returning Users</h5>
      <Form onSubmit={login} className="justify-content-between">
        {loginError && (
          <h4 style={{ color: "red", fontWeight: "bold" }}>
            {loginError}
            <br />
            The page will refresh in 2 seconds...
          </h4>
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            style={{ margin: "10px" }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            style={{ margin: "10px" }}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="dark">
          Login
        </Button>
      </Form>

      <br />
      <br />
      <br />
      <br />

      <h5 className="mb-3">
        Never Used Our Site Before?
        <br />
        Create a New Account to Get Started!
      </h5>

      <Form onSubmit={createAccount} className="justify-content-between">
        {error && (
          <h6 style={{ color: "red", fontWeight: "bold" }}>
            {error}
            <br />
            The page will refresh in 2 seconds...
          </h6>
        )}

        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="dark">
          Create Account
        </Button>
      </Form>
    </div>
  );
}
