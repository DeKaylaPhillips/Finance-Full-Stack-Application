import { MdOutlineAddBox } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";

export default function AddExpense(props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  async function addExpense(event) {
    event.preventDefault()
    const response = await axios.post("/api/budgetSheet/", {
      title: title,
      amount: amount, 
    })
    console.log("AXIOS Call: (addExpense)", response);

    // For automatic state updates to reflect changes in remaining and spend total
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
    <form onSubmit={addExpense}>
      <div className="row justify-content-md-center">
        <div className="col">
          <label for="expense">Expense</label>
          <input
            required="True"
            type="text"
            placeholder="Expense Name"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col">
          <label for="cost">Amount</label>
          <input
            required="True"
            type="text"
            placeholder="Amount"
            className="form-control"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        </div>
        <div className="row justify-content-center">
        <div className="col p-4">
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
