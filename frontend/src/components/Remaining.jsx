import React from "react";

export default function Remaining(props) {
  
  async function addRemainingBalance(event) {
    event.preventDefault()
    const response = await axios.get("/api/budgetSheet/");
    console.log("Axios Call (addRemainingBalance):", response);
    props.getUser()
  }

  return (
    <div className="alert alert-success">
      <span>Remaining: ${props.remaining}</span>
    </div>
  );
}