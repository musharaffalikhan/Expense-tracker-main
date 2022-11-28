import React from "react";
import classes from './ChangeLoginPass.module.css';

const ChangeLoginPass = () => {
  return (
    <section className={classes.profile}>
      <h1>Enter your Email</h1>
      <form className={classes.form} >
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
    </section>
  );
};

export default ChangeLoginPass;
