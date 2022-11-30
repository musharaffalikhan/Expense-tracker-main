import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxo1sxNCdvGq1lKzXK9NaVSp4_JRvmECE";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxo1sxNCdvGq1lKzXK9NaVSp4_JRvmECE";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // let errorMessage = "Authentication failed";
            // if (data && data.error && data.error.message) {
            let errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input type="text" id="password" required />
          </div>
        )}
        <nav>
          {isLogin && (
            <div className={classes.actions}>
              <Link className={classes["toggle-pass"]} to="/changeloginpass">
                Forgot Password?
              </Link>
            </div>
          )}
        </nav>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.toggle}
          onClick={switchHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
