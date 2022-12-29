import React from "react";
import ExpenseItem from "./ExpenseItem";
import classes from "./Expenses.module.css";

const Expenses = (props) => {
  return (
    <div className={classes.expenses}>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          description={expense.description}
          amount={expense.amount}
        />
      ))}
    </div>
  );
};

export default Expenses;
