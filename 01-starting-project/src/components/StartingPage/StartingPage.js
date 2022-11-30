import React, { useState } from "react";
import Expenses from "../NewExpenses/Expenses";
import NewExpenses from "../NewExpenses/NewExpenses";
import classes from "./StartingPage.module.css";

const Dummy_expense=[];

const StartingPage = () => {
   const [expenses , setExpenses]= useState(Dummy_expense);
    const addExpenseHandler = expense =>{
        setExpenses(prevExpenses =>{
            return[expense, ...prevExpenses];
        })
    };
  return (
    <section className={classes.starting}>
        <NewExpenses onAddExpense = {addExpenseHandler}/>
        <Expenses items={expenses}/>
      </section>
  );
};

export default StartingPage;
