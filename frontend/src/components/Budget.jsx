import React, { useState } from "react";
import axios from "axios";

export default function Budget(props) {
  
  async function addUserBudget(event) {
    event.preventDefault()
    const response = await axios.put("/api/budgetSheet/", {
    budget_amount: props.budget,
  });
    console.log("Axios Call (addUserBudget):", response);
    props.getUser()
  }

  return (
    <div>
      <div className="alert alert-primary">
        <span>Budget Total: ${props.budget}</span>
      </div>
      <div>
        <form onSubmit={addUserBudget}>
          <label>
            Enter Budget:
            <input
              type="text"
              placeholder={props.budget}
              onChange={(e) => props.setBudgetAmount(e.target.value)}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
