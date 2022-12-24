import React from "react";

export default function Spend(props) {
  async function addRemainingBalance(event) {
    event.preventDefault()
    const response = await axios.get("/api/budgetSheet/")
    console.log("Axios Call (addRemainingBalance):", response);
    props.getUser()
  }

  return (
    <div className="alert alert-danger">
      <span>Spend Total: ${props.spend}</span>
    </div>
  );
}