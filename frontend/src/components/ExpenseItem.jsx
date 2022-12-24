import React, { useState } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { IconButton } from "rsuite";

export default function ExpenseItem(props) {
  const [newAmount, setNewAmount] = useState(0);

  async function updateExpenseCost(event) {
    event.preventDefault();
    const response = await axios.put("/api/budgetSheet/", {
      id: props.id,
      amount: newAmount,
    });
    console.log("Axios Call (updateUserExpense):", response);
    if (response.status == 200) {
      props.getUser();
    }
  }

  async function deleteExpense(event) {
    const response = await axios.delete("/api/budgetSheet/", {
      id: props.id,
      amoutn: props.amount,
    });
    console.log("Axios Call (deleteUserExpense):", response);
    if (response.status == 200) {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== props.id
      );
      setExpenses(updatedExpenses);
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
