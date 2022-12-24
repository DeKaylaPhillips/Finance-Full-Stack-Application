import React, { useState } from "react";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import { IconButton } from "rsuite";

export default function Budget(props) {
  async function addUserBudget(event) {
    event.preventDefault();
    const response = await axios.put("/api/budgetSheet/", {
      budget_amount: props.budget,
    });
    console.log("Axios Call (addUserBudget):", response);
    props.getUser();
  }

  return (
    <div>
      <div className="alert alert-primary">
        Budget Total: ${props.budget} 
        <br />
        <br />
        <form onSubmit={addUserBudget}>
          Add/Update:
          <br />
          <input
            type="text"
            placeholder="Budget"
            style={{ color: "white", width: "4em" }}
            onChange={(e) => props.setBudgetAmount(e.target.value)}
          />{" "}
          <IconButton
            type="submit"
            style={{backgroundColor: "transparent", color: "black"}}
            circle
            size="xs"
            icon={<GrAddCircle size="1.5em" />}
          />
        </form>
      </div>
    </div>
  );
}
