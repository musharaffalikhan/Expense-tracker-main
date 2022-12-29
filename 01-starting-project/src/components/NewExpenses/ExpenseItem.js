import React from "react";
import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  return (
    <div className={classes["expense-item"]}>
      <div className={classes["expense-item__description"]}>
        <h2>{props.title}</h2>
        <div className={classes["expense-item__description"]}>
          <h2>{props.description}</h2>
          <div className={classes["expense-item__price"]}>${props.amount}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
