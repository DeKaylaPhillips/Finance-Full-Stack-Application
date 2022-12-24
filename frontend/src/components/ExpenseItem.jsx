import React, { useState } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { IconButton } from "rsuite";

export default function ExpenseItem(props) {
  const [newAmount, setNewAmount] = useState(0);

  // PUT - Update expenses in the current expense list
  async function updateExpenseCost(event) {
    event.preventDefault()
    const response = await axios.put("/api/budgetSheet/", {
      id: props.id,
      amount: newAmount,
    });
    console.log("AXIOS Call (updateExpense):", response);

    // For automatic state updates to reflect changes in remaining and spend total
    if (response.status == 200) {
      const response = await axios.get("/api/budgetSheet/")
      const updatedSpendAmount = response.data.data.Budget.spend_amount
      const updatedRemainingBalance = response.data.data.Budget.remaining_balance
      props.setSpendAmount(updatedSpendAmount);
      props.setRemainingBalance(updatedRemainingBalance);
      props.getUser();
    }
  }

  // DELETE - Delete expenses in the current expense list
  async function deleteExpense(event) {
    event.preventDefault()
    const response = await axios.delete("/api/budgetSheet/", {
      data: {
        id: props.id,
      } 
    });
    console.log("AXIOS (deleteExpense):", response);
    
    // For automatic state updates to reflect changes in remaining and spend total
    if (response.status == 200) {
      const response = await axios.get("/api/budgetSheet/");
      const updatedSpendAmount = response.data.data.Budget.spend_amount;
      const updatedRemainingBalance = response.data.data.Budget.remaining_balance;
      props.setSpendAmount(updatedSpendAmount);
      props.setRemainingBalance(updatedRemainingBalance);

      // For automatic state updates to reflect change the list of expenses on the page.
      const updatedExpenses = props.expenses.filter(
        (expense) => expense.id !== props.id
      );
      props.setExpenses(updatedExpenses);
      props.getUser()
    }
  }

  return (
    <div className="list-group p-2">
      <ListGroupItem action variant="dark">
        <div className="list-group-item d-flex justify-content-between align-items-center">
          {props.title}
          <div>
            <span>
              <form onSubmit={updateExpenseCost}>
                ${props.amount}
                {" "}{" "}
                <input type="text" placeholder="Cost" style={{color: "white", width: "4em" }} onChange={(e) => setNewAmount(e.target.value)} />
                {" "}{" "}
                <IconButton type="submit" circle size="sm" icon={<GrUpdate size="1.0em" color="green"/>} />
                {" "}{" "}
                <IconButton onClick={deleteExpense} circle size="sm" icon={<TiDelete size="1.5em" color="red" />} />
              </form>
            </span>
          </div>
        </div>
      </ListGroupItem>
    </div>
  );
}
