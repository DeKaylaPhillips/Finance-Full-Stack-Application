import { MdOutlineAddBox } from "react-icons/md";
import React, { useState } from "react";

export default function AddExpense() {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [amount, setAmount] = useState(0);

  async function addExpense(event) {
    event.preventDefault()
    const response = await axios.post("/api/budgetSheet/", {
      title: expenseTitle,
      amount: amount,
    })
    console.log("AXIOS: addExpense", response.data);
  }
  // UPDATE EXPENSE LIST
  // ADD EVENT HANDLER TO ADD NEW EXPENSE TO USER'S DATABASE
  // ACCEPT USER'S INFORMATION AS PROPS, PROBABLY
  return (
    <form>
      <div className="row justify-content-md-center">
        <div className="col">
          <label for="expense">Expense</label>
          <input
            required="True"
            type="text"
            id="expense"
            placeholder="New Expense Category"
            className="form-control"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
          />
        </div>
        <div className="col">
          <label for="cost">Amount</label>
          <input
            required="True"
            type="text"
            id="cost"
            placeholder="Amount"
            className="form-control"
            value={amount}
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
