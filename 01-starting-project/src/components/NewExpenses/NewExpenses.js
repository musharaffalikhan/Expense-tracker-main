import React from "react";
import ExpenseForm from "./ExpenseForm";
import classes from "./NewExpenses.module.css";

const NewExpenses = (props) => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
    };
    props.onAddExpense(expenseData);
  };

  return (
    <div className={classes["new-expense"]}>
      <ExpenseForm onSaveExpense={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpenses;
