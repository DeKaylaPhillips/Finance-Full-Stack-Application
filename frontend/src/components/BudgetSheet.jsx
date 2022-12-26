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
        <h1 className="mt-5">{firstName}'s Personal Budget Planner</h1>
        <div className="row mt-3">
          <div className="col-sm">
            <Budget 
              budget={budgetAmount}
              setBudgetAmount={setBudgetAmount}
              setExpenses={setExpenses} 
              setRemainingBalance={setRemainingBalance} 
              setSpendAmount={setSpendAmount} 
              getUser={getCurrentUser}
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
            <AddExpense setExpenses={setExpenses} setRemainingBalance={setRemainingBalance} setSpendAmount={setSpendAmount} getUser={getCurrentUser}/>
          </div>
        </div>
      </div>
    </>
  );
}