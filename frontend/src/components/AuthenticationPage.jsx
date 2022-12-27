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
    const response = await axios.post("/api/createAccount/", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    if (response.data["AccountCreated"] == true) {
      alert("Your account was successfully created. Please log in.");
      window.location.reload();
    } else if (response.data["AccountCreated"] == false) {
      setError("Invalid credentials. Please try again.");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

  async function login(event) {
    event.preventDefault();
    const response = await axios.post("/api/signIn/", {
      email: username,
      password: userPassword,
    });
    if (response.data["Login"] !== false) {
      alert("User successfully logged in. Redirecting to user dashboard.");
      setTimeout(() => {
        goToDashboard(), 2000;
      });
    } else if (response.data["Login"] == false) {
      setLoginError("Incorrect username or password. Please try again.");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
    console.log(response);
  }

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard");
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
            The page will refresh in 5 seconds...
          </h4>
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="email" 
            style={{ margin: "10px" }}
            onChange={(e) => {
            setUsername(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="password" 
            style={{ margin: "10px" }}
            onChange={(e) => {
            setUserPassword(e.target.value);
          }}/>
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="dark">Login</Button>
        </Form>
        {/* <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            style={{ margin: "10px" }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            style={{ margin: "10px" }}
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </label> */}

        {/* <button type="submit">Login</button>
      </form> */}

      <br />
      <br />
      <br />
      <br />

      <h5 className="mb-3">
        Never Used Our Site Before?
        <br />
        Create a New Account to Get Started!
      </h5>
  
      <Form className="justify-content-between" onSubmit={createAccount}>
        {error && (
          <h6 style={{ color: "red", fontWeight: "bold" }}>
            {error}
            <br />
            The page will refresh in 5 seconds...
          </h6>
        )}

        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <br />
        <Button type="submit" variant="dark">Create Account</Button>
      </Form>
    </div>
  );
}
