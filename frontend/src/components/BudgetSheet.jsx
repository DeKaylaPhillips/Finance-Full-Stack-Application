import axios from "axios";
import NavBar from "./NavBar";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import Spend from "./SpendAmount";
import AddExpense from "./AddExpense";
import { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";

export default function BudgetSheet() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [spendAmount, setSpendAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);

  async function getCurrentUser() {
    const response = await axios.get("/api/budgetSheet/");
    console.log(response.data)
    setFirstName(response.data.data["First Name"]);
    setLastName(response.data.data["Last Name"]);
    setBudgetAmount(response.data.data.Budget.budget_amount);
    setRemainingBalance(response.data.data.Budget.remaining_balance);
    setSpendAmount(response.data.data.Budget.spend_amount);
    setExpenses(response.data.data.Expenses);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  // TODO: ADD AN ALERT WINDOW TO ALERT USERS WHEN A NEGATIVE REMAINING BALANCE IS CALCULATED.

  return (
    <>
      <NavBar firstName={firstName} lastName={lastName} />
      <div className="container">
        <h1 className="mt-3">{firstName}'s Personal Budget Planner</h1>
        <div className="row mt-3">
          <div className="col-sm">
            <Budget
              budget={budgetAmount}
              getUser={getCurrentUser}
              setBudgetAmount={setBudgetAmount}
            />
          </div>
          <div className="col-sm">
            <Remaining
              remaining={remainingBalance}
              getUser={getCurrentUser}
              setRemainingBalance={setRemainingBalance}
            />
          </div>
          <div className="col-sm">
            <Spend
              spend={spendAmount}
              getUser={getCurrentUser}
              setSpendAmount={setSpendAmount}
            />
          </div>
        </div>
        <h4 className="mt-3">Expenses</h4>
        <div className="row mt-3">
          <div className="col-sm">
            <ul>
              {expenses.map((expense) => (
                <ExpenseItem
                  id={expense.id}
                  title={expense.title}
                  amount={expense.amount}
                  expenses={expenses}
                  setExpenses={setExpenses}
                  setRemainingBalance={setRemainingBalance}
                  setSpendAmount={setSpendAmount}
                  getUser={getCurrentUser}
                />
              ))}
            </ul>
          </div>
        </div>
        <h4 className="mt-3">Add Expenses</h4>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpense />
          </div>
        </div>
      </div>
    </>
  );
}
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
{
  /* <form onSubmit={() => calculateExpenses(expenses)}>
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
      </form> */
}

// const calculateExpenses = () => {
//   let total = expenses.reduce((acc, curr) => acc + curr, 0);
//   setExpenseTotal(total);
// };
