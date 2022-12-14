import React from "react";
import Badge from "react-bootstrap/Badge";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

export default function ExpenseItem(props) {
  console.log(props.id);
  console.log(props.title);
  console.log(props.cost);
  return (
    <div className="list-group p-2">
      <ListGroupItem action variant="success">
        <div className="list-group-item d-flex justify-content-between align-items-center">
          {props.title}
          <div>
            <span>
              ${props.cost} <TiDelete size="1.2em" />
            </span>
          </div>
        </div>
      </ListGroupItem>
    </div>
  );
}
