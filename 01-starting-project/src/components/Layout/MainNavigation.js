import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };
  const emailHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxo1sxNCdvGq1lKzXK9NaVSp4_JRvmECE",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      const data = await res.json();
      console.log(data);
      alert("The link has been send to your email");
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>
          {isLoggedIn ? "Welcome to Expense Tracker!" : "Expense Tracker"}
        </div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">LOGIN</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/changepass">CHANGE PASSWORD</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/updateprof">UPDATE PROFILE</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              {!isLoading && (
                <button type="button" onClick={emailHandler}>
                  Verify email
                </button>
              )}
              {isLoading && <p>sending req...</p>}
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>LOGOUT</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
