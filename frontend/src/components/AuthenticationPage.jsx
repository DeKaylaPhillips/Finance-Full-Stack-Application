import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Authentication() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function createAccount(event) {
    event.preventDefault();
    const response = await axios.post("/api/createAccount/", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });

    if (response.data["AccountCreated"] == true) {
      window.location.href = "/home";
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  }

  // LOGIN FUNCTION NOT RENDERING TO BACK-IN. TODO!
  async function login(event) {
    event.preventDefault()
    const response = await axios.post("/api/login/", {
      email: email,
      password: password,
    });
    if (response.data["Login"] == true) {
      window.location.href = "/home";
      setError("");
    } else {
      setError("Invalid login credentials. Please try again.");
    }
    console.log(response)
  }

  return (
    <div>
      <h1>Capital Kay Finance</h1>
      <h5>Returning Users</h5>
      <form onSubmit={login}>
        {error && <h6 style={{ color: "red", fontWeight: "bold" }}>{error}</h6>}
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            style={{ margin: "10px" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            style={{ margin: "10px" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </form>
      <button>Login</button>
      <br />
      <br />
      <br />
      <br />
      <h5>
        Never Used Our Site Before?
        <br />
        Create a New Account to Get Started!
      </h5>
      <form onSubmit={createAccount}>
        {error && <h6 style={{ color: "red", fontWeight: "bold" }}>{error}</h6>}
        <label>
          First Name:
          <input
            type="text"
            style={{ margin: "10px" }}
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            style={{ margin: "10px" }}
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            style={{ margin: "10px" }}
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            style={{ margin: "10px" }}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
