import React from "react";
import Login from "../components/authorization/Login";
import Register from "../components/authorization/Register";

export default function AuthenticationPage() {
  return (
    <div className="container">
      <h1 className="mt-5">Capital Kay Finance</h1>
      <h3>Personal budgetting, financial news, and salary data.</h3>
      <div className="m-4">
        <h3>Let's Get Started!</h3>
        <Login />
      </div>
      <div className="m-4">
        <h3>Never Used Our Site Before?</h3>
        <Register />
      </div>
    </div>
  );
}
