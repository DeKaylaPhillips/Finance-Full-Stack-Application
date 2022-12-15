import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    const expenses = [
        {id: 1, title: "Rent", cost: 0},
        {id: 2, title: "Utilities", cost: 0},
        {id: 3, title: "Shopping", cost: 0},
        {id: 4, title: "Transportation", cost: 0},
        {id: 5, title: "Food/Dining", cost: 0},
        {id: 6, title: "Childcare", cost: 0},
        {id: 7, title: "Uncategorized", cost: 0},
    ];

    return (
        <ul>
            {expenses.map((expense) => (
              <ExpenseItem id={expense.id} title={expense.title} cost={expense.cost} />  
            ))}
        </ul>

    )
}