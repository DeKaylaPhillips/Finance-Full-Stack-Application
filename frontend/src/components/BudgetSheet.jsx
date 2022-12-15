import axios from "axios";
import NavBar from "./NavBar";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import Spend from "./SpendAmount";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import { useState, useEffect } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import ExpenseItem from "./ExpenseItem";

export default function BudgetSheet() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [rentAmount, setRentAmount] = useState(0);
  // const [utilitiesAmount, setUtilitiesAmount] = useState(0);
  // const [shoppingAmount, setShoppingAmount] = useState(0);
  // const [transportationAmount, setTransportationAmount] = useState(0);
  // const [foodAmount, setFoodAmount] = useState(0);
  // const [childcareAmount, setChildcareAmount] = useState(0);
  // const [uncategorizedAmount, setUncategorizedAmount] = useState(0);
  // const [expenseTotal, setExpenseTotal] = useState(0);

  // const expenses = [
  //   { rentAmount },
  //   { utilitiesAmount },
  //   { shoppingAmount },
  //   { transportationAmount },
  //   { foodAmount },
  //   { childcareAmount },
  //   { uncategorizedAmount },
  // ];
  async function getCurrentUser() {
    const response = await axios.get("/api/budgetSheet/");
    console.log("axios call (budget):", response);
    setFirstName(response.data.data["First Name"]);
    setLastName(response.data.data["Last Name"]);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);


  const calculateExpenses = () => {
    let total = expenses.reduce((acc, curr) => acc + curr, 0);
    setExpenseTotal(total);
  };

  return (
    <>
      <NavBar firstName={firstName} lastName={lastName} />
      <div className="container">
        <h1 className="mt-3">{firstName}'s Personal Budget Planner</h1>
        <div className="row mt-3">
          <div className="col-sm">
            <Budget />
          </div>
          <div className="col-sm">
            <Remaining />
          </div>
          <div className="col-sm">
            <Spend />
          </div>
        </div>
        <h4 className="mt-3">Expenses</h4>
        <div className="row mt-3">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>
        <h4 className="mt-3">Add Expenses</h4>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpense />
          </div>
        </div>
      </div>

      {/* <form onSubmit={() => calculateExpenses(expenses)}>
        <label>
          Rent: <input type="text" data-type="currency" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)}/> ${rentAmount}
        </label>
        <br />
        <label>
          Utilities: <input type="text" data-type="currency" value={utilitiesAmount} onChange={(e) => setUtilitiesAmount(e.target.value)}/> ${utilitiesAmount}
        </label>
        <br />
        <label>
          Shopping: <input type="text" data-type="currency" value={shoppingAmount} onChange={(e) => setShoppingAmount(e.target.value)}/> ${shoppingAmount}
        </label>
        <br />
        <label>
          Transportation
          <input type="text" data-type="currency" value={transportationAmount} onChange={(e) => setTransportationAmount(e.target.value)}/> ${transportationAmount}
        </label>
        <br />
        <label>
          Food/Dining: <input type="text" data-type="currency" value={foodAmount} onChange={(e) => setFoodAmount(e.target.value)}/> ${foodAmount}
        </label>
        <br />
        <label>
          Childcare: <input type="text" data-type="currency" value={childcareAmount} onChange={(e) => setChildcareAmount(e.target.value)}/> ${childcareAmount}
        </label>
        <br />
        <label>
          Uncategorized: <input type="text" data-type="currency" value={uncategorizedAmount} onChange={(e) => setUncategorizedAmount(e.target.value)}/> ${uncategorizedAmount}
        </label>
        <br />
        <br />
        <h6>
          Expense Total: ${expenseTotal} <button>Submit</button>
        </h6>
      </form> */}
    </>
  );
}
