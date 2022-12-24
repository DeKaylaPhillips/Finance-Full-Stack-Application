import React from "react";

export default function Spend(props) {
  async function addSpendTotal(event) {
    event.preventDefault()
    const response = await axios.get("/api/budgetSheet/")
    props.getUser()
  }

  return (
    <div className="alert alert-danger">
      <span>Spend Total: ${props.spend}</span>
    </div>
  );
}