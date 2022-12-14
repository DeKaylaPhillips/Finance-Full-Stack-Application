import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    console.log(response)
  }

  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Capital Kay Finance</h1>
      <h5>Returning Users</h5>
      <form onSubmit={login}>
        
        {loginError && (<h4 style={{ color: "red", fontWeight: "bold" }}>{loginError}<br />The page will refresh in 5 seconds...</h4>)}
        
        <label>
          Email:
          <input type="email" placeholder="Email" style={{ margin: "10px" }} value={username} onChange={(e) => {setUsername(e.target.value);}} />
        </label>
        
        <label>
          Password:
          <input type="password" placeholder="Password" style={{ margin: "10px" }} value={userPassword} onChange={(e) => {setUserPassword(e.target.value);}} />
        </label>
        
        <button type="submit">Login</button>
      </form>

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
        
        {error && (<h6 style={{ color: "red", fontWeight: "bold" }}>{error}<br />The page will refresh in 5 seconds...</h6>)}
        
        <label>
          First Name:
          <input type="text" style={{ margin: "10px" }} value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" style={{ margin: "10px" }} value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" style={{ margin: "10px" }} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password
          <input type="password" style={{ margin: "10px" }} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
