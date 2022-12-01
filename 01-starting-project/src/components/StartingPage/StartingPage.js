import React, { useCallback, useEffect, useState } from "react";
import Expenses from "../NewExpenses/Expenses";
import NewExpenses from "../NewExpenses/NewExpenses";
import classes from "./StartingPage.module.css";

const StartingPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const addExpenseHandler = async (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    try {
      const response = await fetch(
        "https://expense-tracker-d95df-default-rtdb.firebaseio.com/userdata.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchExpenseHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        "https://expense-tracker-d95df-default-rtdb.firebaseio.com/userdata.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          amount: data[key].amount,
        });
      }

      setExpenses(loadedExpenses);
    } catch (error) {
      setError(error.message);
    }
  }, []);
  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  return (
    <section className={classes.starting}>
      <NewExpenses onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </section>
  );
};

export default StartingPage;
