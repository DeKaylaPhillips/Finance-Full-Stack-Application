import React, { useState } from "react";
import axios from "axios";
import { GrAddCircle } from "react-icons/gr";
import { IconButton } from "rsuite";

export default function Budget(props) {
  async function updateBudget(event) {
    event.preventDefault();
    const response = await axios.put("/api/budgetSheet/", {
      budget_amount: props.budget,
    });
    console.log("AXIOS Call (updateBudget):", response);
    if (response.status == 200) {
      const response = await axios.get("/api/budgetSheet/")
      const updatedSpendAmount = response.data.data.Budget.spend_amount
      const updatedRemainingBalance = response.data.data.Budget.remaining_balance
      props.setSpendAmount(updatedSpendAmount);
      props.setRemainingBalance(updatedRemainingBalance);
      props.getUser()
    }
  }

  return (
    <div>
      <div className="alert alert-primary">
        Budget Total: ${props.budget}
        <br />
        <br />
        <form onSubmit={updateBudget}>
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
            style={{ backgroundColor: "transparent", color: "black" }}
            circle
            size="xs"
            icon={<GrAddCircle size="1.5em" />}
          />
        </form>
      </div>
    </div>
  );
}
